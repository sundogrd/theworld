export type Item = {
    id: string;
    name: string;
    description: string;
    equipable: Array<string>;
    meta: {
        [metaKey: string]: any;
    };
};
