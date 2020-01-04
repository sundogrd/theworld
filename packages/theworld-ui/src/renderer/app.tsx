import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import routes from './routes';
import './style/app.less';
import { Provider, observer } from 'mobx-react';
import { createStore } from './store/index';
import { useLocalStore } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import renderRoutes from './routes/renderRoutes';
import DevTool from './devtool';

const App = observer<any>(() => {
    const store = useLocalStore(createStore);
    (window as any).__store = store;
    (window as any).__game = store.gameStore;
    return (
        <Provider {...store}>
            <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
            <DevTool store={store} />
        </Provider>
    );
});

export default hot(App);
