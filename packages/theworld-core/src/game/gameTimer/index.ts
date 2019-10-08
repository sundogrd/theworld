import GameWorld, { GameWorldUpdate, EResultType } from "../GameWorld";
import Creature from "../types/Creature";
import Area from '../types/Area';
import Item from '../types/Item';
import Action from '../types/Action';
import {Tile} from '../types/docs/AreaDoc';
// the world 时间机制实现

// 优化点：
// 是否可以将action加载就读入内存，不用每次都查数据库之类的
// 是否可以将update进行缓存，而非是产生update就立即更新数据库

/**
 * 类似于elona的时间机制
 *
 * @class GameTimer
 */

type ActionInfo = {
    actionId: string;
    target: Creature | Item | Tile;
};


function isCreature(creature: Creature | Item | Tile): creature is Creature {
    return 'gendor' in creature;
} 

function isItem(item: Creature | Item | Tile): item is Creature {
    return 'inventory' in item;
} 

function isTile(tile: Creature | Item | Tile): tile is Tile {
    return 'placeable' in tile;
} 

class GameTimer {
    // 最多增长的值 防止大数问题
    private MAX_TURN: number = 100000;
    // 当前的turn
    private nowTurn: number = 0;
    constructor(public world: GameWorld) {
        this.world = world;
        this.init();
    }

    init() {
        // 这个需要保存，不然重开游戏不能保证时序
        // 先不考虑 TODO
        this.nowTurn = 0; // 需要加载改值
    }

    canApplyThisTurn(creature: Creature) {
        if (creature.nextTurn === this.nowTurn) {
            return true;
        }
        return false;
    }

    async stepNextTurn(): Promise<void> {
        this.nowTurn = (this.nowTurn + 1) % this.MAX_TURN;
        await this.tick();
    }

    async tick(): Promise<void> {
        const area = await this.world.getCurArea();
        const player = await this.world.getPlayer();
        const extraAreas = await this.world.getExtraAreas();

        const {creatures} = area;

        const results = await Promise.all(Object.keys(creatures).map(async key => {
            return await this.world.store.getCreature(key)
        }));

        await this.waitForArea(area, results, extraAreas, player)
        
        await this.waitForCreatures(results, player, area);
        
        await this.waitForPlayer(player, area);
        await this.stepNextTurn();
    }

    async waitForArea(curAea: Area, creatures: Creature[], idleAreas: Area[], player: Creature): Promise<void> {
        // 当前area
        creatures.forEach(c => {
            this.triggerCreatureDead(c, curAea, this.world)
            this.triggerCreatureLeave(c, curAea, this.world)
        })
        this.triggerTimeUpdate(curAea, this.world);
        // 其他area
        this.triggerIdle(idleAreas, this.world);
    }

    async waitForCreatures(creatures: Creature[], player: Creature, area: Area): Promise<void> {
        // 首先判断
        creatures.filter(c => c.id !== player.id).forEach(async c => {
            await this.dealWithCreature(c, player, area)
        })
    }

    async waitForPlayer(player: Creature, area: Area): Promise<void> {
        if (this.canApplyThisTurn(player)) {
            await this.dealWithPlayer(player, area);
        }
    }

    // 获取其他信号量
    getSignal(player: Creature, area: Area, world: GameWorld): ActionInfo {
        // 接受信号
        const rand = Math.random();
        console.log('rand is: ', rand);
        return rand  < 0.001 ? {
            actionId: 'turn-north',
            target: player
        } : null;
    }

    async dealWithCreature(creature: Creature, player: Creature, area: Area): Promise<void> {
        if (this.canApplyThisTurn(creature)) {
            const nextAction = creature.think(this.world, player, creature)
            const rAction: Action = await this.world.getAction(nextAction.actionId);
            this.doAction(creature, nextAction.target, rAction);
        }
    }

    id: string;
    name: string;
    timeSpend: (world?: GameWorld, me?: Creature, target?: Item | Creature) => number;
    check: (world: GameWorld, me: Creature, target?: Item | Creature) => boolean;
    do: (world: GameWorld, me: Creature, target?: Item | Creature) => Array<GameWorldUpdate> | null;

    // 具体的操作，应该产生updates更新world，这里先不管
    doAction(who: Creature, to: Creature | Item | Tile, action: Action): void{
        if (isCreature(to)) {
            console.log(`${who.name} do the action {${action.id}} to ${to.name}`)
        } else if (isItem(to)) {
            console.log(`${who.name} do the action {${action.id}} to ${to.name}`)
        } else if (isTile(to)) {
            console.log(`${who.name} do the action {${action.id}} to ${to.position.x}-${to.position.y}`)
        } else {
            throw new Error('')
        }

        if (action.check(this.world, who, to)) {
            // 需要更新creature nextTurn
            const time = action.timeSpend(this.world, who, to);
            who.nextTurn += time; // 这里也应该写入数据库
            // 产生update并进行
            const updates = action.do(this.world, who, to);
            this.world.applyWorldUpdates(updates);
        }
    }

    async dealWithPlayer(player: Creature, area: Area): Promise<void> {
        let action = this.getSignal(player, area, this.world);
        while(!action) {
            action = this.getSignal(player, area, this.world);
        }
        const {actionId, target} = action;
        const rAction: Action = await this.world.getAction(actionId);
        this.doAction(player, target, rAction)
    }

    // 考虑存在一个缓存机制，每次更新都更改缓存，一定时候才写入数据库 TODO
    // 这个考虑是在这里缓存update还是在update生效后缓存数据库？
    private cache() {

    }

    private triggerTimeUpdate(area: Area, world: GameWorld): void {
        const {areaManagers} = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onTimeUpdate'].call(area, world, area));
        })
        this.world.applyWorldUpdates(updates);
    }

    private triggerCreatureLeave(creature: Creature, area: Area, world: GameWorld): void {
        const {areaManagers} = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onCreatureLeave'].call(area, world, creature, area));
        })
        this.world.applyWorldUpdates(updates);
    }

    private triggerCreatureDead(creature: Creature, area: Area, world: GameWorld): void {
        const {areaManagers} = area;
        const updates: GameWorldUpdate[] = [];
        areaManagers.forEach(manager => {
            updates.push(manager['onCreatureDead'].call(area, world, creature, area));
        })
        this.world.applyWorldUpdates(updates);
    }

    // TODO
    private triggerIdle(areas: Area[], world: GameWorld) {

    }
}


export default GameTimer;