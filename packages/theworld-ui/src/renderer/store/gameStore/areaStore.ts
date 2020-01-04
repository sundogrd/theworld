const areaStore = () => ({
    id: '233',
    name: '起始之地',
    map: [
        [
            {
                type: 'rock',
                position: {
                    areaId: '233',
                    x: 0,
                    y: 0,
                    direction: 'north',
                },
                placeable: false,
                movable: true,
                origin: 'rock',
            },
            {
                type: 'water',
                position: {
                    areaId: '233',
                    x: 1,
                    y: 0,
                    direction: 'north',
                },
                placeable: false,
                movable: true,
                origin: 'rock',
            },
        ],
        [
            {
                type: 'rock',
                position: {
                    areaId: '233',
                    x: 0,
                    y: 1,
                    direction: 'north',
                },
                placeable: false,
                movable: true,
                origin: 'rock',
            },
            {
                type: 'rock',
                position: {
                    areaId: '233',
                    x: 1,
                    y: 1,
                    direction: 'north',
                },
                placeable: false,
                movable: true,
                origin: 'rock',
            },
        ],
    ],
    creatures: {
        musiman: {
            id: 'musiman',
            name: '捕虫少年',
            description: '普通但不一般的NPC, Ta就是人群中最靓的崽',
            gender: 'male',
            race: 'human',
            inventory: {
                maxItem: 10,
                items: {},
            },
            equipment: {},
            position: {
                areaId: '233',
                x: 1,
                y: 1,
                direction: 'north',
            },
            attributes: {
                HP: 100,
                POWER: 10,
                DEF: 5,
            },
            isAlive: true, // false if the creature is dead. :)
        },
    },
    items: {},
});

export default areaStore;
