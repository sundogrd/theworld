import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
// import useStores from '../hooks/useStores';
import WsClient from '../client';
import TerminalDisplayer, { TerminalLevel } from './displayer';

const ClientView: React.FunctionComponent<{}> = observer(() => {
    // const { gameStore } = useStores();
    React.useEffect(() => {
        const wsClient = new WsClient('ws://localhost:8880');
        const displayer = new TerminalDisplayer();
        displayer.mount('#terminal');
        // 发送时
        displayer.onEnter(function(msg, printer) {
            if (wsClient.send(msg)) {
                printer('Send msg successful!', TerminalLevel.SUCCESS);
            } else {
                printer(
                    'Failed send msg for invalid msg type!',
                    TerminalLevel.FAILED,
                );
            }
        });
    });

    return <div id="terminal" />;
});

export default ClientView;
