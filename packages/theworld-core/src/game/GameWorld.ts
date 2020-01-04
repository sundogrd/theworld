import * as Datastore from 'nedb';
import * as EventEmitter from 'eventemitter3';
import ItemRepository from './storage/ItemRepository';
import Store from './storage/Store';
import ItemTemplateRepository from './storage/ItemTemplateRepository';
import CreatureRepository from './storage/CreatureRepository';
import CreatureTemplateRepository from './storage/CreatureTemplateRepository';
import ActionRepository from './storage/ActionRepository';
import AreaRepository from './storage/AreaRepository';
import AttributeRepository from './storage/AttributeRepository';
import Area from './types/Area';
import Creature from './types/Creature';
import Item from './types/Item';
import { Tile } from './types/docs/AreaDoc';
import Action from './types/Action';
import * as winston from 'winston';

export type GameWorldDB = {
    items: Datastore;
    actions: Datastore;
    attributes: Datastore;
    itemTemplates: Datastore;
    creatures: Datastore;
    areas: Datastore;
    creatureTemplates: Datastore;
};

export enum EResultType {
    Message = 'message',
    CreatureChange = 'creature-change',
    AreaChange = 'area-change',
    ItemChange = 'item-change',
}

// TODO: use union type for all of update types
export type GameWorldUpdate = {
    type: EResultType;
    payload: any;
};

function isCreature(creature: Creature | Item | Tile): creature is Creature {
    return (
        'gender' in creature &&
        'race' in creature &&
        'inventory' in creature &&
        'equipment' in creature
    );
}

function isItem(item: Creature | Item | Tile): item is Creature {
    return 'equipable' in item;
}

function isTile(tile: Creature | Item | Tile): tile is Tile {
    return (
        'placeable' in tile &&
        'moveable' in tile &&
        'origin' in tile &&
        'position' in tile
    );
}

// 具体的操作，应该产生updates更新world，这里先不管
async function doAction(
    who: Creature,
    to: Creature | Item | Tile,
    action: Action,
    world: GameWorld,
): Promise<void> {
    if (isCreature(to)) {
        console.log(`${who.name} do the action {${action.id}} to ${to.name}`);
    } else if (isItem(to)) {
        console.log(`${who.name} do the action {${action.id}} to ${to.name}`);
    } else if (isTile(to)) {
        console.log(
            `${who.name} do the action {${action.id}} to ${to.position.x}-${to.position.y}`,
        );
    } else {
        throw new Error('');
    }

    if (action.check(this.world, who, to)) {
        // 需要更新creature nextTurn
        const time = action.timeSpend(this.world, who, to);
        who.nextTurn += time; // 这里也应该写入数据库
        // 产生update并进行
        const updates = action.do(this.world, who, to);
        world.applyWorldUpdates(updates);
    }
}

type ActionCommand = {
    actionId: string;
    target: Creature | Item | Tile;
};

class GameWorld {
    static MAX_UPDATES_TIME = 10;
    static MAX_ROUND: number = Number.MAX_SAFE_INTEGER;
    db: GameWorldDB;
    logger?: winston.Logger;
    itemRepository: ItemRepository;
    itemTemplateRepository: ItemTemplateRepository;
    creatureRepository: CreatureRepository;
    creatureTemplateRepository: CreatureTemplateRepository;
    areaRepository: AreaRepository;
    actionRepository: ActionRepository;
    attributeRepository: AttributeRepository;
    store: Store;
    emitter: EventEmitter;
    private currentRound = 0;

    constructor(db: GameWorldDB, logger: winston.Logger) {
        this.emitter = new EventEmitter();
        this.db = db;
        this.logger = logger;
        this.itemRepository = new ItemRepository(this.db.items);
        this.itemTemplateRepository = new ItemTemplateRepository(
            this.db.itemTemplates,
        );

        this.areaRepository = new AreaRepository(this.db.areas);

        this.creatureRepository = new CreatureRepository(this.db.creatures);
        this.creatureTemplateRepository = new CreatureTemplateRepository(
            this.db.creatureTemplates,
        );
        this.actionRepository = new ActionRepository(this.db.actions);

        this.store = new Store({
            itemRepository: this.itemRepository,
            itemTemplateRepository: this.itemTemplateRepository,
            creatureRepository: this.creatureRepository,
            creatureTemplateRepository: this.creatureTemplateRepository,
            areaRepository: this.areaRepository,
            actionRepository: this.actionRepository,
        });
    }

    async getArea(areaId: string): Promise<Area | null> {
        return await this.store.getArea(areaId);
    }

    // 获取玩家当前所处area
    async getCurArea(): Promise<Area> {
        const player = await this.getPlayer();
        // 获取玩家所在area
        const areaId = player.position.areaId;
        return await this.store.getArea(areaId);
    }

    // 获取非当前area
    async getExtraAreas(): Promise<Area[]> {
        const player = await this.getPlayer();
        const areaId = player.position.areaId;
        return await this.store.getExtraAreas(areaId);
    }

    async getAllAreas(): Promise<Area[]> {
        return await this.store.getAllAreas();
    }

    // 获取玩家
    async getPlayer(): Promise<Creature> {
        // 假设玩家id都为#player
        const playerId = '#player';
        const playerCreature = await this.getCreature(playerId);
        if (!playerCreature) {
            throw new Error('There is no player in store');
        }
        return playerCreature;
    }

    async getAction(actionId: string): Promise<Action> {
        return await this.store.getAction(actionId);
    }

    async getItem(itemId: string): Promise<Item> {
        return await this.store.getItem(itemId);
    }
    async getCreature(creatureId: string): Promise<Creature | null> {
        return await this.store.getCreature(creatureId);
    }

    async run(): Promise<void> {
        // 加载世界对象状态
        // 时间开始流动
        while (true) {
            await this.loopOnce();
        }
    }

    private async loopOnce(): Promise<void> {
        // TODO: 进入循环之前可能存在一些钩子
        console.log('\nWill step into next tick now!\n');

        const area = await this.getCurArea();
        const player = await this.getPlayer();
        const extraAreas = await this.getExtraAreas();

        const { creatures } = area;

        const results = await Promise.all(
            Object.keys(creatures).map(async key => {
                return await this.store.getCreature(key);
            }),
        );

        await this.updateCurrentArea(area, results, player);
        await this.updateIdleAreas(extraAreas, player);
        await this.updateCreatures(results, player, area);
        await this.updatePlayer(player, area);

        // 更新回合并进入下一步
        this.currentRound = (this.currentRound + 1) % GameWorld.MAX_ROUND;
    }

    // applyWorldUpdates用于更新整个游戏世界状态的API，是事务的，有一个异常则回滚全部
    applyWorldUpdates(updates: GameWorldUpdate[]): void {
        const nowUpdateTime = 1;
        let records: GameWorldUpdate[] = [];
        try {
            for (const update of updates) {
                // 保存当前的回滚操作
                records.unshift(this.getRevertUpdate(update));
                this.applyWorldUpdate(update);
            }
        } catch (err) {
            console.log(err);
            // 回滚
            // 可能导致死循环，给定一个最大次数吧
            records = [];
            if (nowUpdateTime < GameWorld.MAX_UPDATES_TIME) {
                this.applyWorldUpdates(records);
            } else {
                // some other thing
                // TODO: can do some thing like throw error
            }
        }
    }

    // 根据update生成
    // TODO: 具体的实现逻辑
    private getRevertUpdate(update: GameWorldUpdate) {
        // switch(update.type) {
        //     case EResultType.Message: {
        //         console.log('update messge is ', update.payload);
        //         break;
        //     }
        //     // 具体的reducer以后具体的写
        //     case EResultType.CreatureChange: {
        //         break;
        //     }
        //     case EResultType.AreaChange:
        //     break;
        //     case EResultType.ItemChange:
        //     break;
        // }
        return update;
    }

    // 返回一个新的世界状态就行了
    applyWorldUpdate(update: GameWorldUpdate): void {
        switch (update.type) {
            case EResultType.Message: {
                console.log('update messge is ', update.payload);
                break;
            }
            // 具体的reducer以后具体的写
            // case EResultType.CreatureChange: {
            //     this.store.
            //     break;
            // }
            // case EResultType.AreaChange:
            // break;
            // case EResultType.ItemChange:
            // break;
        }
    }

    // 更新当前area 应该是私有的，一般不对外暴露
    private async updateCurrentArea(
        curArea: Area,
        creatures: Creature[],
        player: Creature,
    ): Promise<void> {
        // 当前area
        creatures.forEach(creature => {
            this.triggerCreatureDead(creature, curArea);
            this.triggerCreatureLeave(creature, curArea);
        });
        this.triggerTimeUpdate(curArea);
    }

    private async updateIdleAreas(
        idleAreas: Area[],
        player: Creature,
    ): Promise<void> {
        // 所有idle area 都触发
        idleAreas.forEach(area => {
            this.triggerIdleArea(area, player, this);
        });
    }

    async updatePlayer(player: Creature, area: Area): Promise<void> {
        if (this.canApplyThisTurn(player)) {
            let action = this.getSignal(player, area);
            while (!action) {
                action = this.getSignal(player, area);
            }
            // 只有接受到了命令才继续往下走
            const { actionId, target } = action;
            const rAction: Action = await this.getAction(actionId);
            doAction(player, target, rAction, this);
        }
    }

    private canApplyThisTurn(creature: Creature) {
        if (creature.nextTurn === this.currentRound) {
            return true;
        }
        return false;
    }

    // TODO
    private triggerIdleArea(area: Area, player: Creature, world: GameWorld) {}

    private async updateCreatures(
        creatures: Creature[],
        player: Creature,
        area: Area,
    ): Promise<void> {
        creatures
            .filter(c => c.id !== player.id)
            .forEach(async c => {
                await this.dealWithCreature(c, player, area);
            });
    }

    // 每个creature做该回合要做的事
    async dealWithCreature(
        creature: Creature,
        player: Creature,
        area: Area,
    ): Promise<void> {
        if (this.canApplyThisTurn(creature)) {
            const nextAction = creature.think(this, player, creature);
            const rAction: Action = await this.getAction(nextAction.actionId);
            doAction(creature, nextAction.target, rAction, this);
        }
    }

    // 这里模拟了一下
    getSignal(player: Creature, area: Area): ActionCommand {
        // 接受信号
        const rand = Math.random();
        console.log('rand is: ', rand);
        return rand < 0.001
            ? {
                actionId: 'turn-north',
                target: player,
            }
            : null;
    }

    // 触发生物离开操作
    triggerCreatureLeave(creature: Creature, area: Area): void {
        const { areaManagers } = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(
                manager['onCreatureLeave'].call(area, this, creature, area),
            );
        });
        this.applyWorldUpdates(updates);
    }

    triggerCreatureDead(creature: Creature, area: Area): void {
        const { areaManagers } = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(
                manager['onCreatureDead'].call(area, this, creature, area),
            );
        });
        this.applyWorldUpdates(updates);
        this.emitter.emit('creature-update', creature);
        this.emitter.emit(`creature-update-${creature.id}`, creature);
    }

    triggerTimeUpdate(area: Area): void {
        const { areaManagers } = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onTimeUpdate'].call(area, this, area));
        });
        this.applyWorldUpdates(updates);
        this.emitter.emit('time-update');
    }

    // 监听事件
    public on(event: string, handler: (...args: Array<any>) => void): void {
        this.emitter.on(event, handler);
    }
}

export default GameWorld;
