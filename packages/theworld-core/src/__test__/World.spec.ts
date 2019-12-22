import World from '../World';
import * as assert from 'assert';
import * as path from 'path';

describe('World top API', () => {
    // let attribute = null;
    // const base = 10;
    // beforeEach(() => {
    //     attribute = new Attribute('test', base);
    // });

    describe('#World.init', () => {
        it('init simple world', () => {
            const world = new World(
                path.resolve('../../examples/simple-world'),
            );
            world.init({
                codesmith: '1.1.0',
            });
        });
    });
});
