import * as React from 'react';
import { routes, RouteWithSubRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/app.less';
import {Provider, observer} from 'mobx-react';
import { createStore } from './store/index';
import { useLocalStore } from 'mobx-react-lite';

// import DevTools, {configureDevtool} from 'mobx-react-devtools';
// configureDevtool({
//     // Turn on logging changes button programmatically:
//     logEnabled: true,
//     // Turn off displaying components updates button programmatically:
//     updatesEnabled: true,
//     // Log only changes of type `reaction`
//     // (only affects top-level messages in console, not inside groups)
//     logFilter: change => true,
// });
// import {configure} from 'mobx';
// configure({enforceActions: 'observed'});
// configure({enforceActions: 'always'}); // 开启严格模式 只有通过action才可以更改数据
// eslint-disable

const App = observer<any>(() => {
    const store = useLocalStore(createStore)
    return (
        <div>
            <Provider {...store}>
                <Router>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Router>
            </Provider>
            {/* <DevTools/> */}
        </div>
    );
})

export default App
