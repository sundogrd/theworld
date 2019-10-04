import Item from "./item"
import GameWorld from "../GameWorld"

enum EItemCreateSource {

}

export type ItemTemplateCreateSource = {
    type: EItemCreateSource;
    payload: any;
}

type ItemTemplate = {
    id: string;
    name: string; // like rat_template
    create: (world: GameWorld, source: ItemTemplateCreateSource) => Item
}

export default ItemTemplate;
