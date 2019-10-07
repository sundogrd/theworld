export type InventoryDoc = {
    maxItems: number;
    itemIds: Array<string>; // array of item id
};

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
    id: string;
    keywords: Array<string>;
    name: string;
    metadata?: Record<string, any>;
    behaviors?: any;
    description?: string;
    template: string; // template id
    isEquipped: boolean;
    type: EItemType;
    carriedBy?: string; // entity id
    script?: string;
    equippedBy?: string; // entity id

    // container
    maxItems?: number;
    lockedBy?: string;
    closeable?: boolean;
    closed?: boolean;
    locked?: boolean;
    inventory?: InventoryDoc;
};

export type CreatureDoc = {
    id: string;
    name: string;
    inventory: InventoryDoc;
    // equipment: any;
    // combatants: Set<string>; // creature ids
    // combatData: {};
    level: number;
    position: {
        room: string; // room id
        x: number;
        y: number;
        z: number;
    };
    attributes: any;
    followers: Set<string>; // creature ids
    following: string; // creature id
    party: string; // party id
    // effects: any;
    metadata: Record<string, any>;
};
