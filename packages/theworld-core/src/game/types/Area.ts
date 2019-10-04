import { Tile } from "./docs/AreaDoc"
import Creature from "./Creature"
import GameWorld, { GameWorldUpdate } from "../GameWorld"
import Item from "./Item"

type AreaManager = {
    id: string,
    // trigger only when player is in this area
    onTimeUpdate: (world: GameWorld, area: Area) => Array<GameWorldUpdate> | null,
    // trigger only when player is in this area
    onCreatureLeave: (world: GameWorld, creature: Creature, target: Area) => void,
    // trigger only when player is in this area
    onCreatureDead: (world: GameWorld, creature: Creature) => void,
    // trigger when player is **not** in thie area, for Evolution of the area
    onIdle: (world: GameWorld, creature: Creature) => void,
}

type Area = {
    id: string,
    name: string,
    map: Array<Array<Tile | null>>,
    creatures: {
        [creatureId: string]: Creature,
    },
    items: {
        [itemId: string]: Item,
    },
    // where developer register logic into this place.
    areaManagers: Array<AreaManager>,
    meta: {
        [metaKey: string]: any;
    },
}

export default Area
