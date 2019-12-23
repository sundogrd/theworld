import * as assert from 'assert';
import * as fse from 'fs-extra';
import * as path from 'path';
import World from '../World';

describe('World top API', () => {
    // let attribute = null;
    // const base = 10;
    // beforeEach(() => {
    //     attribute = new Attribute('test', base);
    // });

    describe('#World.init', () => {
        it('init simple world', async () => {
            const world = new World(path.resolve(__dirname, 'temp-world'));
            await world.init({
                codesmith: '1.1.0',
            });
            try {
                await fse.access(
                    path.resolve(__dirname, 'temp-world', 'world.json'),
                );
            } catch (e) {
                throw e;
            } finally {
                await fse.remove(path.resolve(__dirname, 'temp-world'));
            }
        });
    });
});
