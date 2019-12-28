import GameWorld from '@/game/GameWorld';
import { ItemTemplateCreateSource } from '../ItemTemplate';
import Item from '../Item';

type ItemTemplateRegistry = {
    id: string;
    name: string; // like sword_template
    equipable: Array<string>;
    create: () => (world: GameWorld, source: ItemTemplateCreateSource) => Item;
};

export default ItemTemplateRegistry;
