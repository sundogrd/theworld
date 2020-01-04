import * as WebSocket from 'ws';
import { checkDataFormat } from '../src/renderer/client/utils';

const wss = new WebSocket.Server({
    port: 8880,
});
type MessagePayload = {
    [key: string]: any;
};

type Message = {
    type: string;
    payload: MessagePayload;
};

function decodeMessage(message: string): Message {
    const parts = message.split(' ').filter(msg => msg);
    const ret: Message = {
        type: '',
        payload: {},
    };
    parts.forEach((part, idx) => {
        if (!idx) {
            ret.type = part.slice(1);
        } else {
            const [key, value] = part.split(':');
            ret.payload[key] = value;
        }
    });
    return ret;
}

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        if (checkDataFormat(String(message))) {
            const msg: Message = decodeMessage(String(message));
            console.log('received directive: %s', JSON.stringify(msg));
            // broadcast
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(msg));
                }
            });
        } else {
            console.log('received client information: ', message);
        }
    });

    ws.send('connection is established!');
});
