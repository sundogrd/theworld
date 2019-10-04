import * as Datastore from 'nedb'

class GameWorld {
    db: {
        items: Datastore,
        creatures: Datastore,
        areas: Datastore,
    }
    constructor(db: {
        items: Datastore,
        creatures: Datastore,
        areas: Datastore,
    }) {
        this.db = db
    }
}

export default GameWorld
