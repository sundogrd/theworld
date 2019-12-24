import donwloadAndDecompressTargz from '../donwloadAndDecompressTargz';
import * as path from 'path';

describe('donwloadAndDecompressTargz', () => {
    // let attribute = null;
    // const base = 10;
    // beforeEach(() => {
    //     attribute = new Attribute('test', base);
    // });

    describe('#base', () => {
        //  jest src/utils/npm/__test__/downloadAndDecompressTargz.spec.ts
        it('download codesmith', async () => {
            jest.setTimeout(10000);
            console.log(
                'path: ',
                path.resolve(__dirname, './donwloadAndDecompressTargz-temp'),
            );
            await donwloadAndDecompressTargz(
                'https://registry.npm.taobao.org/package-json/download/package-json-6.5.0.tgz',
                path.resolve(__dirname, './temp'),
            );
        });
    });
});
