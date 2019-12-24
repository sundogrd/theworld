export type ItemRegistry = {
    id: string;
    name: string;
    description: string;
    // Array of body part
    templateId: string;
    meta: {
        [metaKey: string]: any;
    };
};
