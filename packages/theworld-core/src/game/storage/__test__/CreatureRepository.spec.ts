import CreatureRepository from '../CreatureRepository';
import * as Datastore from 'nedb';
import * as path from 'path';
import { ECreatureGender, EDirection } from '../../types/common';

describe('Creature', () => {
    let creatureRepository: CreatureRepository | null = null;
    const db = new Datastore({
        filename: path.resolve(
            './packages/theworld-core/test/simple-creature.db',
        ),
        autoload: true,
    });
    beforeEach(() => {
        creatureRepository = new CreatureRepository(db);
    });

    describe('#init db', () => {
        it('should update base value', () => {
            console.log(db);
            creatureRepository.addCreature({
                id: '#player',
                name: 'lwio',
                description: 'one of the founders of sundog',
                gender: ECreatureGender.MALE,
                race: 'human',
                inventory: {
                    maxItem: 100,
                    itemIds: [],
                },
                equipment: {},
                templateId: 'lwio-template',
                state: 'unknown', // 保留，智能状态机 state machine
                position: {
                    areaId: 'new_start',
                    x: 0,
                    y: 0,
                    direction: EDirection.EAST,
                },
                // skills: {
                //     [skillId]: SkillStatus;
                // },
                attributes: {},
                isAlive: true, // false if the creature is dead. :)
                thinkScript: '',
                nextTurn: 20, // 下一个行动的时间
                meta: {},
            });
        });
    });
});
