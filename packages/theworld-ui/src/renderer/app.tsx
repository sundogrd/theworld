import * as React from 'react';
import { routes, RouteWithSubRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/app.less';
// eslint-disable
// export interface AppProps {}

export default class App extends React.Component<any> {
    render() {
        return (
            <Router>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Router>
        );
    }
}
