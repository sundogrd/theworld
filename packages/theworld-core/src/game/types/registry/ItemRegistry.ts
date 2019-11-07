export type ItemRegistry = {
    id: string;
    name: string;
    description: string;
    // Array of body part
    equipable: Array<string>;
    template_id: string;
    meta: {
        [metaKey: string]: any;
    };
};
