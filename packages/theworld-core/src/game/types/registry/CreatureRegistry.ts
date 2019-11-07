import { ECreatureGender, EDirection } from '../common';
import Item from '../Item';
import GameWorld from '@/game/GameWorld';
import Creature from '../Creature';
import { Tile } from '../docs/AreaDoc';

type CreatureRegistry = {
    id: string;
    name: string;
    description: string;
    gender: ECreatureGender;
    race: string;
    inventory: {
        maxItem: number;
    };
    templateId: string;
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
    meta: {
        [metaKey: string]: any;
    };
};

export default CreatureRegistry;
