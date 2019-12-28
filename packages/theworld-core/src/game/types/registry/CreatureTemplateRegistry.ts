import GameWorld from '@/game/GameWorld';
import { CreatureTemplateCreateSource } from '../CreatureTemplate';
import Creature from '../Creature';

// registry本质是doc，但为了简化bundle开发者工作了，封装一层，Registry更加轻量易写。

type CreatureTemplateRegistry = {
    id: string;
    name: string; // like rat_template
    race: string;
    create: (
        world: GameWorld,
        source: CreatureTemplateCreateSource,
    ) => Creature;
};

export default CreatureTemplateRegistry;
