/**
 * 我们有如下消息结果
 * type: "playerAction",
 * payload: {
 *   id: "action-id",
 *   target: "5352",
 * }
 * 故而客户端消息格式应该为 =>  @playerAction   id:action-id   target:5352
 */
import { checkDataFormat } from './utils';
interface MessageHandler {
    (msg: { type: string; payload: any }): any;
}
export default class Client {
    ws: WebSocket;
    private _messageHandlers: MessageHandler[];
    constructor(path: string, options?: any) {
        const ws = new WebSocket(path);
        this.ws = ws;
        this._messageHandlers = [];
        ws.addEventListener('open', function open() {
            ws.send('Client ready to connect now');
        });

        ws.addEventListener('message', e => {
            try {
                const data = JSON.parse(e.data);
                console.log('receive from server: ', data);
                this._messageHandlers.forEach(handler => {
                    handler.call(this, data);
                });
            } catch (err) {
                console.error('Invalid message received!');
            }
        });
    }

    onMessage(handler: MessageHandler) {
        this._messageHandlers.push(handler);
    }

    send(data: string) {
        if (checkDataFormat(data)) {
            this.ws.send(data);
            return true;
        }
        return false;
    }
}
