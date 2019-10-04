import GameWorld from "../GameWorld"
import Item from "./item"
import { Tile } from "./docs/AreaDoc"

enum ECreatureGender {
    FEMALE = 'female',
    MALE = 'male',
}

type EDirection = {
    WEST: 'west',
    EAST: 'east',
    NORTH: 'north',
    SOUTH: 'south',
}

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
        itemIds: Array<string>;
    },
    equipment: {
        // bodyPart' value is item id
        [bodyPart: string]: string | null;
    },
    templateId: string;
    state: string; // 保留，智能状态机 state machine
    position: {
        areaId: string;
        x: number;
        y: number;
        direction: EDirection;
    },
    // skills: {
    //     [skillId]: SkillStatus;
    // },
    attributes: {
        [attributeKey: string]: any;
    },
    isAlive: boolean, // false if the creature is dead. :)
    think: (world: GameWorld, player: Creature, me: Creature) => {
        actionId: string;
        target: null | Creature | Item | Tile;
    },
    nextTurn: number; // 下一个行动的时间
    meta: {
        [metaKey: string]: any;
    }
}

export default Creature
