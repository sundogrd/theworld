import { ECreatureGender, EDirection } from '../common';

type InventoryDoc = {
    maxItem: number;
    itemIds: Array<string>;
};

// type SkillStatus = {
//     level: number;
//     currentExp: number;
//     nextLevelExp: number;
// }

type CreatureDoc = {
    id: string;
    name: string;
    description: string;
    gender: ECreatureGender;
    race: string;
    inventory: InventoryDoc;
    equipment: {
        // bodyPart' value is item id
        [bodyPart: string]: string | null;
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
    thinkScript: string;
    nextTurn: number; // 下一个行动的时间
    meta: {
        [metaKey: string]: any;
    };
};

export default CreatureDoc;
