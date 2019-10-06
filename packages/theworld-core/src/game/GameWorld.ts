import * as Datastore from 'nedb'
import ItemRepository from './storage/ItemRepository'
import Store from './storage/Store'
import ItemTemplateRepository from './storage/ItemTemplateRepository'
import CreatureRepository from './storage/CreatureRepository'
import CreatureTemplateRepository from './storage/CreatureTemplateRepository'
import AreaRepository from './storage/AreaRepository'

export type GameWorldDB = {
    items: Datastore,
    itemTemplates: Datastore,
    creatures: Datastore,
    areas: Datastore,
}

export type GameWorldUpdate = {

}

class GameWorld {
    db: GameWorldDB
    itemRepository: ItemRepository
    itemTemplateRepository: ItemTemplateRepository
    creatureRepository: CreatureRepository
    creatureTemplateRepository: CreatureTemplateRepository
    areaRepository: AreaRepository
    store: Store
    constructor(db: GameWorldDB) {
        this.db = db
        this.itemRepository = new ItemRepository(this.db.items)
        this.itemTemplateRepository = new ItemTemplateRepository(this.db.itemTemplates)

        this.store = new Store({
            itemRepository: this.itemRepository,
            itemTemplateRepository: this.itemTemplateRepository,
            creatureRepository: this.creatureRepository,
            creatureTemplateRepository: this.creatureTemplateRepository,
            areaRepository: this.areaRepository,
        })
    }
}

export default GameWorld
