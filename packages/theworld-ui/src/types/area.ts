import { Creature } from './creature';
import { Item } from './item';

export enum EDirection {
    WEST = 'west',
    EAST = 'east',
    NORTH = 'north',
    SOUTH = 'south',
}

export type TilePosition = {
    areaId: string;
    x: number;
    y: number;
    direction: EDirection;
};

export type Tile = {
    type: string;
    position: TilePosition;
    placeable: boolean;
    movable: boolean;
    oriign: string;
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
