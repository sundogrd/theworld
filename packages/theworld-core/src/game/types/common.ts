export enum EDirection {
    WEST = 'west',
    EAST = 'east',
    NORTH = 'north',
    SOUTH = 'south',
}

export enum ECreatureGender {
    FEMALE = 'female',
    MALE = 'male',
}


export type QueryType = {
    is: {
        [key: string]: any
    },
    not: {
        [key: string]: any
    }
}
