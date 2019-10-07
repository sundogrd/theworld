import AreaRepository from '../AreaRepository';
import * as Datastore from 'nedb';
import * as path from 'path';

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
                id: 'death_land',
                name: 'Death Land',
                map: [[null, null], [null, null]],
                creatures: [],
                items: [],
                // where developer register logic into this place.
                areaManagers: [],
                meta: {
                    hello: 'world',
                },
            });
        });
    });
});
