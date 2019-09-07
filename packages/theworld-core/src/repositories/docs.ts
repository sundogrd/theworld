
export type InventoryDoc = {
    maxItems: number
    itemIds: Array<string> // array of item id
}

// Item
export enum EItemType {
    OBJECT = 'object',
    CONTAINER = 'container',
    ARMOR = 'armor',
    WEAPON = 'weapon',
    POTION = 'potion',
    RESOURCE = 'resource',
}

export type ItemDoc = {
    keywords: Array<string>;
    name: string;
    id: string;
    metadata?: any;
    behaviors?: any;
    description?: string;
    template: string; // template id
    isEquipped: boolean;
    type: EItemType;
    carriedBy?: string; // entity id
    script?: string
    equippedBy?: string; // entity id

    // container
    maxItems?: number
    lockedBy?: string;
    closeable?: boolean;
    closed?: boolean;
    locked?: boolean;
    inventory?: InventoryDoc;
}
