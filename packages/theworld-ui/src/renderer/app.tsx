import * as React from 'react';
import { routes, RouteWithSubRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/app.less';
import {Provider} from 'mobx-react';
import store from './store';
  
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
export default class App extends React.Component<any> {
    render() {
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
    }
}
