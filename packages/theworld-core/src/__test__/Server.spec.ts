import * as path from 'path';
import * as WebSocket from 'ws';
import Server, { EServerEvent } from '../Server';

describe('Server', () => {
    // let attribute = null;
    // const base = 10;
    // beforeEach(() => {
    //     attribute = new Attribute('test', base);
    // });

    jest.setTimeout(50000);
    it('#Server connect', async done => {
        const server = new Server(4434);
        let testClient: WebSocket;
        setTimeout(() => {
            testClient = new WebSocket('ws://localhost:4434');
        }, 100);

        server.on(EServerEvent.CONNECTED, () => {
            testClient.on('open', function open() {
                console.log('onopen');
                testClient.send('something');
                server.sendUpdateWorld();
            });

            testClient.on('message', function incoming(data) {
                console.log(data);
                done();
            });
        });
    });
});
