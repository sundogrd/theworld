import Creature from './Creature';
import GameWorld from '../GameWorld';

enum ECreatureCreateSource {}

export type CreatureTemplateCreateSource = {
    type: ECreatureCreateSource;
    payload: any;
};

type CreatureTemplate = {
    id: string;
    name: string; // like rat_template
    race: string;
    create: (
        world: GameWorld,
        source: CreatureTemplateCreateSource,
    ) => Creature;
};

export default CreatureTemplate;
