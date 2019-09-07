import { EventEmitter } from "events";

// the class take responsibility for everything the player do and display
class World extends EventEmitter {
    constructor(worldData: any) {
        super()
    }
}

export default World
