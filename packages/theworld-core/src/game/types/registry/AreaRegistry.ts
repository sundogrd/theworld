import { Tile } from '../docs/AreaDoc';
import { AreaManager } from '../Area';

type AreaRegistry = {
    id: string;
    name: string;
    map: Array<Array<Tile | null>>;
    creatures: Array<string>;
    items: Array<string>;
    // where developer register logic into this place.
    areaManagers: Array<AreaManager>;
    meta: {
        [metaKey: string]: any;
    };
};

export default AreaRegistry;
