type ItemDoc = {
    id: string;
    name: string;
    description: string;
    // Array of body part
    equipable: Array<string>;
    templateId: string;
    meta: {
        [metaKey: string]: any;
    };
};

export default ItemDoc;
