import { Creature } from './creature';
import { Item } from './item';

export type TilePosition = {
    areaId: string;
    x: number;
    y: number;
};

export type Tile = {
    type: string;
    position: TilePosition;
    placeable: boolean;
    movable: boolean;
    origin: string | null;
    meta?: any;
};

export type Area = {
    id: string;
    name: string;
    map: Array<Array<Tile | null>>;
    creatures: {
        [id: string]: Creature;
    };
    items: {
        [itemId: string]: Item;
    };
    meta?: {
        [key: string]: any;
    };
};
