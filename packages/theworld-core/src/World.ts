import { EventEmitter } from "events";

// the class take responsibility for everything the player do and display
class World extends EventEmitter {
    constructor(worldDir: any) {
        super()
    }

    run(): void {
        throw new Error("not implemented")
    }

    load(): void {
        throw new Error("not implemented")
    }
}

export default World
