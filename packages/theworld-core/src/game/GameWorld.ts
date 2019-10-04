import * as Datastore from 'nedb'
import ItemRepository from './storage/ItemRepository'
import Store from './storage/Store'
import ItemTemplateRepository from './storage/ItemTemplateRepository'

type GameWorldDB = {
    items: Datastore,
    itemTemplates: Datastore,
    creatures: Datastore,
    areas: Datastore,
}

class GameWorld {
    db: GameWorldDB
    itemRepository: ItemRepository
    itemTemplateRepository: ItemTemplateRepository
    store: Store
    constructor(db: GameWorldDB) {
        this.db = db
        this.itemRepository = new ItemRepository(this.db.items)
        this.itemTemplateRepository = new ItemTemplateRepository(this.db.itemTemplates)

        this.store = new Store({
            itemRepository: this.itemRepository,
            itemTemplateRepository: this.itemTemplateRepository,
        })
    }
}

export default GameWorld
