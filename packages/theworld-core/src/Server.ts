import * as WebSocket from 'ws';
import * as EventEmitter from 'eventemitter3';

export enum EServerEvent {
    ON_PLAYER_ACTION = 'on-player-action',
    CONNECTED = 'connected',
    ON_NEW_MESSAGE = 'on-new-message',
}

type TheWorldClientMessage = {};

class Server {
    wss: WebSocket.Server;
    emitter: EventEmitter;
    connection: WebSocket;

    constructor(port?: number) {
        this.wss = new WebSocket.Server({ port: port || 4434 });
        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', message => {
                // TODO: 处理消息并触发emitter
                this.emitter.emit(EServerEvent.ON_NEW_MESSAGE, message);
            });
            this.connection = ws;
            this.emitter.emit(EServerEvent.CONNECTED, ws);
        });
        this.emitter = new EventEmitter();
    }

    // 监听事件
    public on(
        event: EServerEvent,
        handler: (...args: Array<any>) => void,
    ): void {
        this.emitter.on(event, handler);
    }

    public sendUpdateWorld(): void {
        // TODO: 补全send逻辑和结构
        if (!this.connection) {
            throw new Error('connect has not established');
        }
        this.connection.send(JSON.stringify({}));
    }
}
export default Server;
