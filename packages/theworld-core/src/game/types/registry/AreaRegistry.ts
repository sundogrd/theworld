import { Tile } from '../docs/AreaDoc';

type AreaRegistry = {
    id: string;
    name: string;
    map: Array<Array<Tile | null>>;
    creatures: Array<string>;
    items: Array<string>;
    // where developer register logic into this place.
    // areaManagers: Array<{
    //     id: string;
    //     onTimeUpdateScript: string;
    //     onCreatureLeaveScript: string;
    //     onCreatureDeadScript: string;
    //     onIdleScript: string;
    // }>;
    meta: {
        [metaKey: string]: any;
    };
};

export default AreaDoc;
