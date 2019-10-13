import ItemRepository from './ItemRepository';
import ItemTemplateRepository from './ItemTemplateRepository';
import Item from '../types/Item';
import ItemTemplate, { ItemTemplateCreateSource } from '../types/ItemTemplate';
import GameWorld, { GameWorldUpdate } from '../GameWorld';
import CreatureRepository from './CreatureRepository';
import CreatureTemplateRepository from './CreatureTemplateRepository';
import AreaRepository from './AreaRepository';
import Creature from '../types/Creature';
import { Tile } from '../types/docs/AreaDoc';
import CreatureTemplate, {
    CreatureTemplateCreateSource,
} from '../types/CreatureTemplate';
import Area from '../types/Area';
import Action from '../types/Action';

type StoreOptions = {
    itemRepository: ItemRepository;
    itemTemplateRepository: ItemTemplateRepository;
    creatureRepository: CreatureRepository;
    creatureTemplateRepository: CreatureTemplateRepository;
    areaRepository: AreaRepository;
};

// only support function(), haven't supported arrow function yet
export function parseFunction(functionStr: string): Function | null {
    const funcReg = /function *\(([^()]*)\)[ \n\t]*{(.*)}/gim;
    const match = funcReg.exec(functionStr.replace(/\n/g, ' '));

    if (match) {
        return new Function(...match[1].split(','), match[2]);
    }

    return null;
}

/**
 * store for game
 *
 * @class Store
 */
class Store {
    itemRepository: ItemRepository;
    itemTemplateRepository: ItemTemplateRepository;
    creatureRepository: CreatureRepository;
    creatureTemplateRepository: CreatureTemplateRepository;
    areaRepository: AreaRepository;
    constructor(storeOptions: StoreOptions) {
        this.itemRepository = storeOptions.itemRepository;
        this.itemTemplateRepository = storeOptions.itemTemplateRepository;
        this.creatureRepository = storeOptions.creatureRepository;
        this.creatureTemplateRepository =
            storeOptions.creatureTemplateRepository;
        this.areaRepository = storeOptions.areaRepository;
    }

    async getItem(itemId: string): Promise<Item> {
        const itemDoc = await this.itemRepository.getItemById(itemId);
        // TODO: pack item
        return itemDoc;
    }

    // TODO
    async getAction(actionId: string): Promise<Action> {
        // const itemDoc = await this.itemRepository.getItemById(itemId);
        // return itemDoc;
        return {} as Action;
    }

    async getItemTemplate(templateId: string): Promise<ItemTemplate> {
        const itemTemplateDoc = await this.itemTemplateRepository.getItemTemplateById(
            templateId,
        );
        return {
            id: itemTemplateDoc.id,
            name: itemTemplateDoc.name,
            create: new Function(itemTemplateDoc.createScript) as (
                world: GameWorld,
                source: ItemTemplateCreateSource,
            ) => Item,
        };
    }

    async getCreature(creatureId: string): Promise<Creature> {
        const creatureDoc = await this.creatureRepository.getCreatureById(
            creatureId,
        );

        // 补全equipment
        const equipment: { [bodyPart: string]: Item | null } = {};
        const equipmentItemIds = Object.values(creatureDoc.equipment).filter(
            itemId => itemId !== null,
        );
        const equipmentItems = await this.itemRepository.mgetItemByIds(
            equipmentItemIds,
        );
        for (const [bodyPart, bodyEquipmentItemId] of Object.entries(
            creatureDoc.equipment,
        )) {
            equipment[bodyPart] =
                bodyEquipmentItemId !== null
                    ? equipmentItems[bodyEquipmentItemId]
                    : null;
        }

        // 补全inventory
        const inventoryItems = await this.itemRepository.mgetItemByIds(
            creatureDoc.inventory.itemIds,
        );
        const inventory = {
            maxItem: creatureDoc.inventory.maxItem,
            items: inventoryItems,
        };

        const position = {
            areaId: creatureDoc.position.areaId,
            x: creatureDoc.position.x,
            y: creatureDoc.position.y,
            direction: creatureDoc.position.direction,
        };

        // TODO: implement attributes
        const attributes = {};

        // pack creature
        return {
            id: creatureDoc.id,
            name: creatureDoc.name,
            description: creatureDoc.description,
            gender: creatureDoc.gender,
            race: creatureDoc.race,
            inventory: inventory,
            equipment: equipment,
            templateId: creatureDoc.templateId,
            state: creatureDoc.state,
            position: position,
            // skills: {
            //     [skillId]: SkillStatus;
            // },
            attributes: attributes,
            isAlive: creatureDoc.isAlive, // false if the creature is dead. :)
            think: parseFunction(creatureDoc.thinkScript) as (
                world: GameWorld,
                player: Creature,
                me: Creature,
            ) => {
                actionId: string;
                target: null | Creature | Item | Tile;
            } | null,
            nextTurn: creatureDoc.nextTurn, // 下一个行动的时间
            meta: creatureDoc.meta,
        };
    }

    async getCreatureTemplate(templateId: string): Promise<CreatureTemplate> {
        const templateDoc = await this.creatureTemplateRepository.getCreatureTemplateById(
            templateId,
        );
        return {
            id: templateDoc.id,
            name: templateDoc.name,
            create: parseFunction(templateDoc.createScript) as (
                world: GameWorld,
                source: CreatureTemplateCreateSource,
            ) => Creature,
        };
    }


    async getExtraAreas(areaId: string): Promise<Area[]> {
        const areaDocs = await this.areaRepository.getExtraAreas(areaId);

        const results = await Promise.all(areaDocs.map(async areaDoc => {
            const areaCreatures = await this.creatureRepository.mgetCreatureByIds(
                areaDoc.creatures,
            );
            const areaItems = await this.itemRepository.mgetItemByIds(
                areaDoc.items,
            );
            return {
                id: areaDoc.id,
                name: areaDoc.name,
                map: areaDoc.map,
                creatures: areaCreatures,
                items: areaItems,
                // where developer register logic into this place.
                areaManagers: areaDoc.areaManagers.map(areaDocManager => ({
                    id: areaDocManager.id,
                    onTimeUpdate: parseFunction(
                        areaDocManager.onTimeUpdateScript,
                    ) as (
                        world: GameWorld,
                        area: Area,
                    ) => Array<GameWorldUpdate> | null,
                    onCreatureLeave: parseFunction(
                        areaDocManager.onCreatureLeaveScript,
                    ) as (
                        world: GameWorld,
                        creature: Creature,
                        target: Area,
                    ) => Array<GameWorldUpdate> | null,
                    onCreatureDead: parseFunction(
                        areaDocManager.onCreatureDeadScript,
                    ) as (
                        world: GameWorld,
                        creature: Creature,
                    ) => Array<GameWorldUpdate> | null,
                    onIdle: parseFunction(areaDocManager.onIdleScript) as (
                        world: GameWorld,
                        creature: Creature,
                    ) => Array<GameWorldUpdate> | null,
                })),
                meta: areaDoc.meta,
            };
        }));

        return results;
    }

    async getAllAreas(): Promise<Area[]> {
        const areaDocs = await this.areaRepository.getAllAreas();

        const results = await Promise.all(areaDocs.map(async areaDoc => {
            const areaCreatures = await this.creatureRepository.mgetCreatureByIds(
                areaDoc.creatures,
            );
            const areaItems = await this.itemRepository.mgetItemByIds(
                areaDoc.items,
            );
            return {
                id: areaDoc.id,
                name: areaDoc.name,
                map: areaDoc.map,
                creatures: areaCreatures,
                items: areaItems,
                // where developer register logic into this place.
                areaManagers: areaDoc.areaManagers.map(areaDocManager => ({
                    id: areaDocManager.id,
                    onTimeUpdate: parseFunction(
                        areaDocManager.onTimeUpdateScript,
                    ) as (
                        world: GameWorld,
                        area: Area,
                    ) => Array<GameWorldUpdate> | null,
                    onCreatureLeave: parseFunction(
                        areaDocManager.onCreatureLeaveScript,
                    ) as (
                        world: GameWorld,
                        creature: Creature,
                        target: Area,
                    ) => Array<GameWorldUpdate> | null,
                    onCreatureDead: parseFunction(
                        areaDocManager.onCreatureDeadScript,
                    ) as (
                        world: GameWorld,
                        creature: Creature,
                    ) => Array<GameWorldUpdate> | null,
                    onIdle: parseFunction(areaDocManager.onIdleScript) as (
                        world: GameWorld,
                        creature: Creature,
                    ) => Array<GameWorldUpdate> | null,
                })),
                meta: areaDoc.meta,
            };
        }));

        return results;
    }

    async getArea(areaId: string): Promise<Area> {
        const areaDoc = await this.areaRepository.getAreaById(areaId);
        const areaCreatures = await this.creatureRepository.mgetCreatureByIds(
            areaDoc.creatures,
        );
        const areaItems = await this.itemRepository.mgetItemByIds(
            areaDoc.items,
        );
        return {
            id: areaDoc.id,
            name: areaDoc.name,
            map: areaDoc.map,
            creatures: areaCreatures,
            items: areaItems,
            // where developer register logic into this place.
            areaManagers: areaDoc.areaManagers.map(areaDocManager => ({
                id: areaDocManager.id,
                onTimeUpdate: parseFunction(
                    areaDocManager.onTimeUpdateScript,
                ) as (
                    world: GameWorld,
                    area: Area,
                ) => Array<GameWorldUpdate> | null,
                onCreatureLeave: parseFunction(
                    areaDocManager.onCreatureLeaveScript,
                ) as (
                    world: GameWorld,
                    creature: Creature,
                    target: Area,
                ) => Array<GameWorldUpdate> | null,
                onCreatureDead: parseFunction(
                    areaDocManager.onCreatureDeadScript,
                ) as (
                    world: GameWorld,
                    creature: Creature,
                ) => Array<GameWorldUpdate> | null,
                onIdle: parseFunction(areaDocManager.onIdleScript) as (
                    world: GameWorld,
                    creature: Creature,
                ) => Array<GameWorldUpdate> | null,
            })),
            meta: areaDoc.meta,
        };
    }
}

export default Store;
