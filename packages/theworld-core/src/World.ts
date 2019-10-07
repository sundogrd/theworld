import * as path from 'path';
import * as Datastore from 'nedb';
import * as WebSocket from 'ws';
import GameWorld from './game/GameWorld';
// the class take responsibility for everything the player do and display
class World {
    worldDir: string;
    db: {
        items: Datastore;
        creatures: Datastore;
        areas: Datastore;
    };
    gameWorld: GameWorld;
    wss?: WebSocket.Server;
    constructor(worldDir: any) {
        this.worldDir = path.resolve(worldDir);
    }
    /**
     * 加载游戏文件夹
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

        this.gameWorld = new GameWorld(this.db);
    }

    run(port?: number): void {
        if (this.wss) {
            throw new Error('This method is already run before');
        }
        this.wss = new WebSocket.Server({ port: port || 4434 });
        this.wss.on('connection', function connection(ws: any) {
            ws.on('message', function incoming(message: string) {
                console.log('received: %s', message);
            });
            ws.send('something');
        });
    }
}

export default World;
