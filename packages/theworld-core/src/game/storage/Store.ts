import ItemRepository from "./ItemRepository";
import ItemTemplateRepository from "./ItemTemplateRepository";
import Item from "../types/Item";
import ItemTemplate, { ItemTemplateCreateSource } from "../types/ItemTemplate";
import GameWorld from "../GameWorld";
import CreatureRepository from "./CreatureRepository";
import CreatureTemplateRepository from "./CreatureTemplateRepository";
import AreaRepository from "./AreaRepository";
import Creature from "../types/Creature";
import { Tile } from "../types/docs/AreaDoc";

type StoreOptions = {
    itemRepository: ItemRepository,
    itemTemplateRepository: ItemTemplateRepository,
    creatureRepository: CreatureRepository,
    creatureTemplateRepository: CreatureTemplateRepository,
    areaRepository: AreaRepository,
}

/**
 * store for game
 *
 * @class Store
 */
class Store {
    itemRepository: ItemRepository
    itemTemplateRepository: ItemTemplateRepository
    creatureRepository: CreatureRepository
    creatureTemplateRepository: CreatureTemplateRepository
    areaRepository: AreaRepository
    constructor(storeOptions: StoreOptions) {
        this.itemRepository = storeOptions.itemRepository
        this.itemTemplateRepository = storeOptions.itemTemplateRepository
        this.creatureRepository = storeOptions.creatureRepository
        this.creatureTemplateRepository = storeOptions.creatureTemplateRepository
        this.areaRepository = storeOptions.areaRepository
    }

    async getItem(itemId: string): Promise<Item> {
        const itemDoc = await this.itemRepository.getItemById(itemId)
        // TODO: pack item
        return itemDoc
    }

    async getItemTemplate(templateId: string): Promise<ItemTemplate> {
        const itemTemplateDoc = await this.itemTemplateRepository.getItemTemplateById(templateId)
        return {
            id: itemTemplateDoc.id,
            name: itemTemplateDoc.name,
            create: new Function(itemTemplateDoc.createScript) as (world: GameWorld, source: ItemTemplateCreateSource) => Item
        }
    }

    async getCreature(creatureId: string): Promise<Creature> {
        const creatureDoc = await this.creatureRepository.getCreatureById(creatureId)

        // 补全equipment
        const equipment: {[bodyPart: string]: Item | null;}  = {}
        const equipmentItemIds = Object.values(creatureDoc.equipment).filter((itemId) => itemId !== null)
        const equipmentItems = await this.itemRepository.mgetItemByIds(equipmentItemIds)
        for (const [bodyPart, bodyEquipmentItemId] of Object.entries(creatureDoc.equipment)) {
            equipment[bodyPart] = bodyEquipmentItemId !== null ? equipmentItems[bodyEquipmentItemId] : null
        }

        // 补全inventory
        const inventoryItems = await this.itemRepository.mgetItemByIds(creatureDoc.inventory.itemIds)
        const inventory = {
            maxItem: creatureDoc.inventory.maxItem,
            items: inventoryItems,
        }

        const position = {
            areaId: creatureDoc.position.areaId,
            x: creatureDoc.position.x,
            y: creatureDoc.position.y,
            direction: creatureDoc.position.direction,
        }

        // TODO: implement attributes
        const attributes = {}

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
            think: new Function(creatureDoc.thinkScript) as (world: GameWorld, player: Creature, me: Creature) => {
                actionId: string;
                target: null | Creature | Item | Tile;
            },
            nextTurn: creatureDoc.nextTurn, // 下一个行动的时间
            meta: creatureDoc.meta,
        }
    }
}

export default Store
