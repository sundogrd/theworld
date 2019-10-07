import CreatureTemplateRepository from '../CreatureTemplateRepository';
import * as Datastore from 'nedb';
import * as path from 'path';
import { ECreatureGender, EDirection } from '../../types/common';

describe('Item Repository test', () => {
    let creatureTemplateRepository: CreatureTemplateRepository | null = null;
    const db = new Datastore({
        filename: path.resolve('./packages/theworld-core/test/simple-creature-template.db'),
        autoload: true,
    });
    beforeEach(() => {
        creatureTemplateRepository = new CreatureTemplateRepository(db);
    });

    describe('#init creature template db', () => {
        it('should add creature template', () => {
            console.log(db);
            creatureTemplateRepository.addCreatureTemplate({
                id: 'rat',
                name: 'rat_template', // like rat_template
                createScript: `function (world, source) {
                    return  {
                        id: 'lwio',
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
                            areaId: 'death-land',
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
                    }
                }`
            });
        });
    });
});