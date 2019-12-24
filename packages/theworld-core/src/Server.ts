import * as WebSocket from 'ws';
import * as EventEmitter from 'eventemitter3';

export enum EServerEvent {
    ON_PLAYER_ACTION = 'on-player-action',
}

type TheWorldClientMessage = {};

class Server {
    wss: WebSocket.Server;
    ws: WebSocket;
    emitter: EventEmitter;

    constructor(port?: number) {
        this.wss = new WebSocket.Server({ port: port || 4434 });
        this.wss.on('connection', (ws: WebSocket) => {
            this.ws = ws;
            ws.on('message', () => {
                // TODO: 处理消息并触发emitter
            });
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
        this.ws.send(JSON.stringify({}));
    }
}
export default Server;
