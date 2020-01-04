import { EDirection } from '../common';

export type Tile = {
    type: string; // like 'water'
    position: {
        areaId: string;
        x: number;
        y: number;
    };
    placeable: boolean;
    // TODO: using mask code for movable
    moveable: boolean; // whether creature can move through the tile
    origin: string | null; // origin type if place by something, for restore if the thing remove.
    meta: Record<string, any>;
};

type AreaDoc = {
    id: string;
    name: string;
    map: Array<Array<Tile | null>>;
    creatures: Array<string>;
    items: Array<string>;
    // where developer register logic into this place.
    areaManagers: Array<{
        id: string;
        onTimeUpdateScript: string;
        onCreatureLeaveScript: string;
        onCreatureDeadScript: string;
        onIdleScript: string;
    }>;
    meta: {
        [metaKey: string]: any;
    };
};

export default AreaDoc;
