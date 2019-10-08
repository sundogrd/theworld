import GameWorld, { GameWorldUpdate } from "../GameWorld";
import Creature from "../types/Creature";
import Item from "../types/Item";
import {Tile} from "../types/docs/AreaDoc";

type Action = {
    id: string;
    name: string;
    timeSpend: (world?: GameWorld, me?: Creature, target?: Item | Creature | Tile) => number;
    check: (world: GameWorld, me: Creature, target?: Item | Creature | Tile) => boolean;
    do: (world: GameWorld, me: Creature, target?: Item | Creature | Tile) => Array<GameWorldUpdate> | null;
}

export default Action
