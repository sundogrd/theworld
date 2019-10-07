import GameWorld from '../GameWorld';
import Item from './Item';
import { Tile } from './docs/AreaDoc';
import { EDirection, ECreatureGender } from './common';

// type SkillStatus = {
//     level: number;
//     currentExp: number;
//     nextLevelExp: number;
// }

type Creature = {
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
        // bodyPart' value is item id
        [bodyPart: string]: Item | null;
    };
    templateId: string;
    state: string; // 保留，智能状态机 state machine
    position: {
        areaId: string;
        x: number;
        y: number;
        direction: EDirection;
    };
    // skills: {
    //     [skillId]: SkillStatus;
    // },
    attributes: {
        [attributeKey: string]: any;
    };
    isAlive: boolean; // false if the creature is dead. :)
    think: (
        world: GameWorld,
        player: Creature,
        me: Creature,
    ) => {
        actionId: string;
        target: null | Creature | Item | Tile;
    } | null;
    nextTurn: number; // 下一个行动的时间
    meta: {
        [metaKey: string]: any;
    };
};

export default Creature;
