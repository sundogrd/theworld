import GameEntity from "@/game/GameEntity";
import { ItemDoc, EItemType } from "../docs";

/**
 * @property {object}  metadata    Essentially a blob of whatever attrs the item designer wanted to add
 * @property {Array}   behaviors   list of behaviors this object uses
 * @property {string}  description Long description seen when looking at it
 * @property {number}  id          vnum
 * @property {boolean} isEquipped  Whether or not item is currently equipped
 * @property {?Character} equippedBy Entity that has this equipped
 * @property {Map}     inventory   Current items this item contains
 * @property {string}  name        Name shown in inventory and when equipped
 * @property {string}  script      A custom script for this item
 * @property {ItemType|string} type
 * @property {boolean} closeable   Whether this item can be closed (Default: false, true if closed or locked is true)
 * @property {?(Character|Item)} carriedBy Entity that has this in its Inventory
 *
 * @extends GameEntity
 */
class Item extends GameEntity {
    metadata: any;
    description: string;
    template: string; // template id
    id: string;
    isEquipped: boolean;
    keywords: string[];
    name: string;
    script?: string; // script-id
    type: EItemType | string;
    closeable: boolean;
    carriedBy: string; // id
    equippedBy: string; // id
    constructor (itemDoc: ItemDoc) {
        super();
        const validate = ['keywords', 'name', 'id'];

        for (const prop of validate) {
            if (!(prop in itemDoc)) {
                throw new ReferenceError(`Item missing required property [${prop}]`);
            }
        }

        this.metadata  = itemDoc.metadata || {};
        this.behaviors = new Map(Object.entries(itemDoc.behaviors || {}));
        this.description = itemDoc.description || 'Nothing special.';
        this.template = itemDoc.template; // template key
        this.id          = itemDoc.id;
        this.isEquipped  = itemDoc.isEquipped || false;
        this.keywords    = itemDoc.keywords;
        this.name        = itemDoc.name;
        this.script      = itemDoc.script || null;

        this.type = itemDoc.type || EItemType.OBJECT;

        this.closeable   = false;

        this.carriedBy = itemDoc.carriedBy || null;
        this.equippedBy = null;
    }

    hasKeyword(keyword: string): boolean {
        return this.keywords.indexOf(keyword) !== -1;
    }
}

export default Item
