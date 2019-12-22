import donwloadAndDecompressTargz from '../donwloadAndDecompressTargz';
import * as path from 'path';

describe('donwloadAndDecompressTargz', () => {
    // let attribute = null;
    // const base = 10;
    // beforeEach(() => {
    //     attribute = new Attribute('test', base);
    // });

    describe('#base', () => {
        it('download codesmith', () => {
            donwloadAndDecompressTargz(
                'https://registry.npm.taobao.org/codesmith/download/codesmith-1.0.0.tgz',
                path.resolve('./temp'),
            );
        });
    });
});
