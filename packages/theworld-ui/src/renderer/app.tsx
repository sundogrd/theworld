import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import routes from './routes';
import { set } from 'lodash-es';
import './style/app.less';
import { Provider, observer } from 'mobx-react';
import { createStore } from './store/index';
import { useLocalStore } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import renderRoutes from './routes/renderRoutes';
import DevTool from './devtool';
// 引入websocket 客户端
import WsClient from './client';
const client = new WsClient('ws://localhost:8880');

const App = observer<any>(() => {
    const store = useLocalStore(createStore);
    client.onMessage(function connection(data) {
        const curStore = (store.gameStore as any)[data.type];
        const payload = data.payload;
        for (const [k, v] of Object.entries(payload)) {
            set(curStore, k, v);
        }
    });
    return (
        <Provider {...store}>
            <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
            <DevTool />
        </Provider>
    );
});

export default hot(App);
