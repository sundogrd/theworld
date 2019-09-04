'use strict';

import GameEntity from '../GameEntity'

enum EItemType {
    OBJECT = 'object',
    CONTAINER = 'container',
    ARMOR = 'armor',
    WEAPON = 'weapon',
    POTION = 'potion',
    RESOURCE = 'resource',
}

export type ItemData = {
    keywords: Array<string>;
    name: string;
    id: string;
    metadata?: any;
    behaviors?: any;
    description?: string;
    entityReference: string;
    isEquipped: boolean;
    type: EItemType;
    script?: string
}


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
    entityReference: string; // factory id
    id: string;
    isEquipped: boolean;
    keywords: string[];
    name: string;
    script?: string; // script-id
    type: EItemType | string;
    closeable: boolean;
    carriedBy: string; // id
    equippedBy: string; // id
    constructor (item: ItemData) {
        super();
        const validate = ['keywords', 'name', 'id'];

        for (const prop of validate) {
            if (!(prop in item)) {
                throw new ReferenceError(`Item missing required property [${prop}]`);
            }
        }

        this.metadata  = item.metadata || {};
        this.behaviors = new Map(Object.entries(item.behaviors || {}));
        this.description = item.description || 'Nothing special.';
        this.entityReference = item.entityReference; // EntityFactory key
        this.id          = item.id;
        this.isEquipped  = item.isEquipped || false;
        this.keywords    = item.keywords;
        this.name        = item.name;
        this.script      = item.script || null;

        this.type = item.type || EItemType.OBJECT;

        this.closeable   = false;

        this.carriedBy = null;
        this.equippedBy = null;
    }

    hasKeyword(keyword: string): boolean {
        return this.keywords.indexOf(keyword) !== -1;
    }
}

export default Item
