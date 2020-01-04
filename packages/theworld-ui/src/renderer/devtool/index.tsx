import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
// import useStores from '../hooks/useStores';
// import WsClient from '../../../test/ws/client';
import TerminalDisplayer from './displayer';

const ClientView: React.FunctionComponent<{}> = observer(() => {
    // const { gameStore } = useStores();
    React.useEffect(() => {
        // const wsClient = new WsClient('ws://localhost:8880');
        const displayer = new TerminalDisplayer();
        displayer.mount('#terminal');
    });

    return <div id="terminal" />;
});

export default ClientView;
