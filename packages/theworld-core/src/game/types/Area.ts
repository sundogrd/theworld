import { Tile } from "./docs/AreaDoc"
import Creature from "./Creature"
import GameWorld, { GameWorldUpdate } from "../GameWorld"
import CreatureDoc from "./docs/CreatureDoc"
import ItemDoc from "./docs/ItemDoc"

type AreaManager = {
    id: string,
    // trigger only when player is in this area
    onTimeUpdate: (world: GameWorld, area: Area) => Array<GameWorldUpdate> | null,
    // trigger only when player is in this area
    onCreatureLeave: (world: GameWorld, creature: Creature, target: Area) => Array<GameWorldUpdate> | null,
    // trigger only when player is in this area
    onCreatureDead: (world: GameWorld, creature: Creature) => Array<GameWorldUpdate> | null,
    // trigger when player is **not** in thie area, for Evolution of the area
    onIdle: (world: GameWorld, creature: Creature) => Array<GameWorldUpdate> | null,
}

type Area = {
    id: string,
    name: string, // i18n template available
    map: Array<Array<Tile | null>>,
    creatures: {
        [creatureId: string]: CreatureDoc,
    },
    items: {
        [itemId: string]: ItemDoc,
    },
    // where developer register logic into this place.
    areaManagers: Array<AreaManager>,
    meta: {
        [metaKey: string]: any;
    },
}

export default Area
