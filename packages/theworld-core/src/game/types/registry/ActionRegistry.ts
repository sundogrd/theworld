import GameWorld, { GameWorldUpdate } from '@/game/GameWorld';
import Creature from '../Creature';
import Item from '../Item';
import { Tile } from '../docs/AreaDoc';

type ActionRegistry = {
    id: string;
    name: string;
    timeSpend: (
        world?: GameWorld,
        me?: Creature,
        target?: Item | Creature | Tile,
    ) => number;
    check: (
        world: GameWorld,
        me: Creature,
        target?: Item | Creature | Tile,
    ) => boolean;
    do: (
        world: GameWorld,
        me: Creature,
        target?: Item | Creature | Tile,
    ) => Array<GameWorldUpdate> | null;
};

export default ActionRegistry;
