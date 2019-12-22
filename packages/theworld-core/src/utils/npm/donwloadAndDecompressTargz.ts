import * as request from 'request';
import * as tar from 'tar';
import * as fse from 'fs-extra';
const downloadAndDecompressTargz = (
    targzUrl: string,
    targetDirPath: string,
): Promise<void> => {
    fse.ensureDirSync(targetDirPath);
    return new Promise((resolve, reject) => {
        request(targzUrl)
            .pipe(fse.createWriteStream(`${targetDirPath}/temp.tgz`))
            .on('finish', () => {
                fse.createReadStream(`${targetDirPath}/temp.tgz`)
                    .pipe(
                        tar.extract({
                            strict: true,
                            strip: 1,
                            Directory: true,
                            cwd: targetDirPath,
                        }),
                    )
                    .on('error', function(e) {
                        reject(e);
                    })
                    .end(() => {
                        resolve();
                    });
            })
            .on('error', function(e) {
                reject(e);
            });
    });
};

export default downloadAndDecompressTargz;
