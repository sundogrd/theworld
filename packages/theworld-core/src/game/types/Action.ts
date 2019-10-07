import GameWorld, { GameWorldUpdate } from "../GameWorld";
import Creature from "../types/Creature";
import Item from "../types/Item";

type Action = {
    id: string;
    name: string;
    timeSpend: (world?: GameWorld, me?: Creature, target?: Item | Creature) => number;
    check: (world: GameWorld, me: Creature, target?: Item | Creature) => boolean;
    do: (world: GameWorld, me: Creature, target?: Item | Creature) => Array<GameWorldUpdate> | null;
}

export default Action
