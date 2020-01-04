/**
 * 我们有如下消息结果
 * type: "playerAction",
 * payload: {
 *   id: "action-id",
 *   target: "5352",
 * }
 * 故而客户端消息格式应该为 =>  @playerAction   id:action-id   target:5352
 */
import { checkDataFormat } from '../utils/ws';
export default class Client {
    ws: WebSocket
    constructor(path: string, options?: any) {
        const ws = new WebSocket(path);
        this.ws = ws
        ws.addEventListener('open', function open() {
            ws.send('Client ready to connect now');
        })

        ws.addEventListener('message', function incoming(e) {
            console.log('receive from server: ', e.data);
        });
    }

    send(data: string) {
        if (checkDataFormat(data)) {
            this.ws.send(data)
            return true;
        }
        return false;
    }

}