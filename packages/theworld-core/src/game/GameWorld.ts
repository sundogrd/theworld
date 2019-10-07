import * as Datastore from 'nedb';
import ItemRepository from './storage/ItemRepository';
import Store from './storage/Store';
import ItemTemplateRepository from './storage/ItemTemplateRepository';
import CreatureRepository from './storage/CreatureRepository';
import CreatureTemplateRepository from './storage/CreatureTemplateRepository';
import AreaRepository from './storage/AreaRepository';
import Area from './types/Area';
import Creature from './types/Creature';
import Item from './types/Item';
import GameTimer from './gameTimer';

export type GameWorldDB = {
    items: Datastore;
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

export type GameWorldUpdate = {
    type: EResultType,
    payload: any,
};


class GameWorld {
    db: GameWorldDB;
    itemRepository: ItemRepository;
    itemTemplateRepository: ItemTemplateRepository;
    creatureRepository: CreatureRepository;
    creatureTemplateRepository: CreatureTemplateRepository;
    areaRepository: AreaRepository;
    store: Store;
    timer: GameTimer;
    constructor(db: GameWorldDB) {
        this.db = db;
        this.itemRepository = new ItemRepository(this.db.items);
        this.itemTemplateRepository = new ItemTemplateRepository(
            this.db.itemTemplates,
        );

        this.areaRepository = new AreaRepository(this.db.areas);

        this.creatureRepository = new CreatureRepository(this.db.creatures);
        this.creatureTemplateRepository = new CreatureTemplateRepository(this.db.creatureTemplates);

        this.store = new Store({
            itemRepository: this.itemRepository,
            itemTemplateRepository: this.itemTemplateRepository,
            creatureRepository: this.creatureRepository,
            creatureTemplateRepository: this.creatureTemplateRepository,
            areaRepository: this.areaRepository,
        });

        this.timer = new GameTimer(this);
    }

    async getArea (areaId: string): Promise<Area> {
        return await this.store.getArea(areaId);
    }

    // 获取当前所处area
    async getCurArea(): Promise<Area> {
        const player = await this.getPlayer();
        // 获取玩家所在area
        const areaId = player.position.areaId;
        return await this.store.getArea(areaId);
    }

    async getAllAreas(): Promise<Area[]> {
        return await this.store.getAllAreas();
    }

    // 获取玩家
    async getPlayer(): Promise<Creature> {
        // 假设玩家id都为#player
        const playerId = '#player';
        return await this.getCreature(playerId)
    }

    async getItem (itemId: string): Promise<Item> {
        return await this.store.getItem(itemId);
    }
    async getCreature(creatureId: string): Promise<Creature> {
        return await this.store.getCreature(creatureId);
    }
    async run() {
        // 时间开始流动 toki o wutokimasi
        await this.timer.tick();
    }
    // applyWorldUpdates用于更新整个游戏世界状态的API，是事务的，有一个异常则回滚全部
    applyWorldUpdates (updates: GameWorldUpdate[]): void {
        updates.forEach(update => this.applyWorldUpdate(update))
    }

    applyWorldUpdate(update: GameWorldUpdate): void {
        switch(update.type) {
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
}

export default GameWorld;
