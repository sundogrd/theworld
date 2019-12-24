import * as request from 'request';
import * as tar from 'tar';
import * as fse from 'fs-extra';
import * as os from 'os';
const downloadAndDecompressTargz = (
    targzUrl: string,
    targetDirPath: string,
): Promise<void> => {
    fse.ensureDirSync(targetDirPath);
    const r = Math.random()
        .toString(36)
        .substring(7);
    fse.ensureDirSync(`${os.tmpdir()}/the-world`);
    const tempFilePath = `${os.tmpdir()}/the-world/${r}.tgz`;
    return new Promise((resolve, reject) => {
        request(targzUrl)
            .pipe(fse.createWriteStream(tempFilePath))
            .on('finish', () => {
                tar.extract({
                    file: tempFilePath,
                    strip: 1,
                    cwd: targetDirPath,
                })
                    .then(() => {
                        resolve();
                    })
                    .catch(e => {
                        reject(e);
                    });
            })
            .on('error', function(e) {
                reject(e);
            });
    });
};

export default downloadAndDecompressTargz;
