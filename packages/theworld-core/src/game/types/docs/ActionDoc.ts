type ActionDoc = {
    id: string;
    name: string;
    timeSpendScript: string; // (world?: GameWorld, me?: Creature, target?: Item | Creature | Tile) => number;
    checkScript: string; // (world: GameWorld, me: Creature, target?: Item | Creature | Tile) => boolean;
    doScript: string; // (world: GameWorld, me: Creature, target?: Item | Creature | Tile) => Array<GameWorldUpdate> | null;
}

export default ActionDoc
