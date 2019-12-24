import * as path from 'path';
import * as Datastore from 'nedb';
import * as WebSocket from 'ws';
import * as fse from 'fs-extra';
import * as winston from 'winston';
import GameWorld from './game/GameWorld';
import downloadAndDecompressTargz from './utils/npm/donwloadAndDecompressTargz';
import getNpmTarballUrl from './utils/npm/getNpmTarballUrl';
import Server, { EServerEvent } from './Server';

const theworldLogFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    },
);

// the class take responsibility for everything the player do and display
class World {
    worldDir: string;
    db: {
        items: Datastore;
        creatures: Datastore;
        areas: Datastore;
        itemTemplates: Datastore;
        creatureTemplates: Datastore;
    };
    gameWorld: GameWorld;
    server: Server;
    logger: winston.Logger;

    wss?: WebSocket.Server;
    constructor(worldDir: string) {
        this.worldDir = path.resolve(worldDir);
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp(),
                theworldLogFormat,
            ),
            transports: [new winston.transports.Console()],
        });
    }

    /**
     * 初始化游戏世界，在worldDir中生成文件
     *
     * @memberof World
     */
    async init(bundles: { [bundle: string]: string }): Promise<void> {
        this.logger.info('start init world');
        await fse.ensureDir(this.worldDir);
        // 判断当前worldDir未被初始化
        const worldJsonPath = path.resolve(this.worldDir, './world.json');
        const hasWorldJson = await fse.pathExists(worldJsonPath);
        if (hasWorldJson) {
            throw new Error('Wobundlesrld has already inited');
        }

        // 拉npm包并解压到`${this.worldDir}/bundle-packages/${bundlePkg}`
        await Promise.all(
            Object.keys(bundles).map(async bundlePkg => {
                const tarballUrl = await getNpmTarballUrl(
                    bundlePkg,
                    bundles[bundlePkg],
                );
                await downloadAndDecompressTargz(
                    tarballUrl,
                    `${this.worldDir}/bundle-packages/${bundlePkg}`,
                );
            }),
        );

        // TODO: 执行bundle初始化并保存到worldDir中的各个db文件中
        for await (const bundlePkg of Object.keys(bundles)) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const pkgDirPath = require(`${this.worldDir}/bundle-packages/${bundlePkg}`);

            // TODO: 对每个package加载完后的数据完整性进行check，比如某个creature的template是错误的
        }

        // 写入 world.json 内容
        await fse.writeFile(
            `${this.worldDir}/world.json`,
            JSON.stringify({
                bundles: bundles,
            }),
        );
        this.logger.info('world inited');
    }

    /**
     * 加载历史游戏文件夹
     *
     * @memberof World
     */
    load(): void {
        this.db.items = new Datastore({
            filename: path.resolve(this.worldDir, './items.db'),
            autoload: true,
        });
        this.db.creatures = new Datastore({
            filename: path.resolve(this.worldDir, './creatures.db'),
            autoload: true,
        });
        this.db.areas = new Datastore({
            filename: path.resolve(this.worldDir, './areas.db'),
            autoload: true,
        });

        this.db.itemTemplates = new Datastore({
            filename: path.resolve(this.worldDir, './itemTemplates.db'),
        });

        this.db.creatureTemplates = new Datastore({
            filename: path.resolve(this.worldDir, './creatureTemplates.db'),
        });

        this.gameWorld = new GameWorld(this.db);
    }

    run(port?: number): void {
        if (this.wss) {
            throw new Error('This method is already run before');
        }
        this.server = new Server(port);
        this.server.on(EServerEvent.ON_PLAYER_ACTION, () => {
            // TODO: 处理事件，调用gameWorld方法
        });
    }
}

export default World;
