import ItemRepository from "./ItemRepository";
import ItemTemplateRepository from "./ItemTemplateRepository";
import Item from "../types/item";
import ItemTemplate, { ItemTemplateCreateSource } from "../types/ItemTemplate";
import GameWorld from "../GameWorld";

type StoreOptions = {
    itemRepository: ItemRepository,
    itemTemplateRepository: ItemTemplateRepository,
}

/**
 * store for game
 *
 * @class Store
 */
class Store {
    itemRepository: ItemRepository
    itemTemplateRepository: ItemTemplateRepository
    constructor(storeOptions: StoreOptions) {
        this.itemRepository = storeOptions.itemRepository
        this.itemTemplateRepository = storeOptions.itemTemplateRepository
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
}

export default Store
