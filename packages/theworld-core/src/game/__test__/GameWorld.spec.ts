import GameWorld, { GameWorldDB } from '../GameWorld';
import * as Datastore from 'nedb';
import * as path from 'path';
import * as assert from 'assert';
// import Area from '../types/Area';

describe('Test GameWorld', () => {
    let gw: GameWorld = null;
    const base = 10;
    const db = {};
    beforeEach(() => {
        gw = new GameWorld(
            {
                items: new Datastore({
                    filename: path.resolve(__dirname, './test-world/items.db'),
                    autoload: true,
                }),
                actions: new Datastore({
                    filename: path.resolve(
                        __dirname,
                        './test-world/actions.db',
                    ),
                    autoload: true,
                }),
                attributes: new Datastore({
                    filename: path.resolve(
                        __dirname,
                        './test-world/attributes.db',
                    ),
                    autoload: true,
                }),
                creatures: new Datastore({
                    filename: path.resolve(
                        __dirname,
                        './test-world/creatures.db',
                    ),
                    autoload: true,
                }),
                areas: new Datastore({
                    filename: path.resolve(__dirname, './test-world/areas.db'),
                    autoload: true,
                }),
                itemTemplates: new Datastore({
                    filename: path.resolve(
                        __dirname,
                        './test-world/itemTemplates.db',
                    ),
                    autoload: true,
                }),
                creatureTemplates: new Datastore({
                    filename: path.resolve(
                        __dirname,
                        './test-world/creatureTemplates.db',
                    ),
                    autoload: true,
                }),
            } as GameWorldDB,
            null,
        );
    });
    describe('get area', () => {
        it('can get null area by areaId', async () => {
            const area = await gw.getArea('death_land');
            console.log(area);
            assert.ok(area === null);
        });
        it('can get single area by areaId', async () => {
            const area = await gw.getArea('adranus');
            console.log(area);
            assert.ok('areaManagers' in area);
        });
        it('can get all areas', async () => {
            const area = await gw.getAllAreas();
            console.log(area);
            assert.ok('length' in area);
        });
    });
    describe('get item', () => {
        it('can get single item by itemId', async () => {
            const item = await gw.getItem('bad_apple');
            console.log(item);
            assert.ok('equipable' in item);
        });
        // it('should not allow negative base', () => {
        //     attribute.setBase(-100);
        //     assert.equal(attribute.base, 0);
        // });
    });
    describe('get creature', () => {
        it('can get single creature by creatureId', async () => {
            const creature = await gw.getCreature('lwio');
            console.log(creature);
            assert.ok('gender' in creature);
        });
        // it('should not allow negative base', () => {
        //     attribute.setBase(-100);
        //     assert.equal(attribute.base, 0);
        // });
    });
    describe('gameworld run', () => {
        it('game world can run and time can step', async () => {
            function gameNext(): Promise<void> {
                return new Promise(resolve => {
                    setTimeout(function() {
                        console.log('game run over');
                        resolve();
                    }, 1000);
                });
            }
            await gw.run();
            await gameNext();
            assert.ok(1);
        });
    });
    describe('null', () => {});
});
