import AreaRepository from '../AreaRepository';
import * as Datastore from 'nedb';
import * as path from 'path';
import { EDirection, ECreatureGender } from '../../types/common';

describe('Basic Attribute', () => {
    let areaRepository: AreaRepository | null = null;
    const db = new Datastore({
        filename: path.resolve('./packages/theworld-core/test/simple-area.db'),
        autoload: true,
    });
    beforeEach(() => {
        areaRepository = new AreaRepository(db);
    });

    describe('#init db', () => {
        it('should update base value', () => {
            console.log(db);
            areaRepository.addArea({
                id: 'new_start',
                name: '起始之地',
                areaManagers: [],
                meta: {},
                map: [
                    [
                        {
                            type: 'rock',
                            position: {
                                areaId: 'new_start',
                                x: 0,
                                y: 0,
                                direction: EDirection.NORTH,
                            },
                            placeable: false,
                            moveable: true,
                            origin: 'rock',
                            meta: null,
                        },
                        {
                            type: 'water',
                            position: {
                                areaId: 'new_start',
                                x: 1,
                                y: 0,
                                direction: EDirection.NORTH,
                            },
                            placeable: false,
                            moveable: true,
                            origin: 'rock',
                            meta: null,
                        },
                    ],
                    [
                        {
                            type: 'rock',
                            position: {
                                areaId: 'new_start',
                                x: 0,
                                y: 1,
                                direction: EDirection.NORTH,
                            },
                            placeable: false,
                            moveable: true,
                            origin: 'rock',
                            meta: null,
                        },
                        {
                            type: 'rock',
                            position: {
                                areaId: 'new_start',
                                x: 1,
                                y: 1,
                                direction: EDirection.NORTH,
                            },
                            placeable: false,
                            moveable: true,
                            origin: 'rock',
                            meta: null,
                        },
                    ],
                ],
                creatures: ['musiman'],
                items: [],
            });
        });
    });
});

// id: 'musiman',
// name: '捕虫少年',
// description: '普通但不一般的NPC, Ta就是人群中最靓的崽',
// gender: ECreatureGender.MALE,
// race: 'human',
// inventory: {
//     maxItem: 10,
//     items: {},
// },
// equipment: {},
// position: {
//     areaId: 'new_start',
//     x: 1,
//     y: 1,
//     direction: EDirection.SOUTH,
// },
// attributes: {
//     HP: 100,
//     POWER: 10,
//     DEF: 5,
// },
// mata: {},
// isAlive: true, // false if the creature is dead. :)
