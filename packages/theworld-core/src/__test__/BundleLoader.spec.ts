import * as assert from 'assert';
import * as fse from 'fs-extra';
import * as path from 'path';
import BundleLoader from '../BundleLoader';

describe('BundleLoader top API', () => {
    // let attribute = null;
    // const base = 10;
    // beforeEach(() => {
    //     attribute = new Attribute('test', base);
    // });

    jest.setTimeout(50000);
    it('#loadBundle', async () => {
        const loader = new BundleLoader(
            path.resolve(__dirname, 'BundleLoader-playground'),
        );
        try {
            await loader.loadBundle('testpkg');
        } catch (e) {
            throw e;
        } finally {
        }
    });
});
