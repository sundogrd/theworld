import * as request from 'request';
import * as tar from 'tar';
const downloadAndDecompressTargz = (
    targzUrl: string,
    targetDirPath: string,
): Promise<void> => {
    return new Promise((resolve, reject) => {
        request(targzUrl)
            .pipe(
                tar.x({
                    strip: 1,
                    C: targetDirPath, // alias for cwd:'some-dir', also ok
                }),
            )
            .on('error', function(e) {
                reject(e);
            })
            .end(() => {
                resolve();
            });
    });
};

export default downloadAndDecompressTargz;
