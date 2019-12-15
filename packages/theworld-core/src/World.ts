import * as path from 'path';
import * as Datastore from 'nedb';
import * as WebSocket from 'ws';
import GameWorld from './game/GameWorld';
import Server, { EServerEvent } from './Server';
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

    wss?: WebSocket.Server;
    constructor(worldDir: any) {
        this.worldDir = path.resolve(worldDir);
    }

    /**
     * 初始化游戏世界，在worldDir中生成文件
     *
     * @memberof World
     */
    init(bundles: { [bundle: string]: string }): void {
        console.log(this.worldDir);
        // TODO: 判断当前worldDir未被初始化s

        // TODO: 拉npm包？

        // TODO: 放置于worldDir的packages文件夹？

        // TODO: 执行bundle初始化并保存到worldDir中的各个db文件中.
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
