import { Item } from './item';
import { TilePosition, Tile } from './area';

export enum ECreatureGender {
    FEMALE = 'female',
    MALE = 'male',
}

export type Creature = {
    id: string;
    name: string;
    description: string;
    gender: ECreatureGender;
    race: string;
    inventory: {
        maxItem: number;
        items: {
            [itemId: string]: Item;
        };
    };
    equipment: {
        [bodyPart: string]: Item | null;
    };
    position: TilePosition;
    attributes: {
        [attributeKey: string]: any;
    };
    isAlive: boolean; // false if the creature is dead. :)
    meta?: {
        [metaKey: string]: any;
    };
};
