import * as React from "react";
import { Switch, Route, RouteComponentProps, Redirect } from "react-router";
import { Path } from "history";



export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    route?: RouteConfig;
}

export interface RouteConfig {
    key?: React.Key;
    location?: Location;
    redirect?: Path;
    component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
    path?: string | string[];
    exact?: boolean;
    strict?: boolean;
    routes?: RouteConfig[];
    render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
    [propName: string]: any;
}


const renderRoutes: React.FunctionComponent<any> = (routes: Array<RouteConfig>, extraProps = {}, switchProps = {}) => {
    if (!routes) {
        null
    }
    // return <Route path="/" >fuck</Route>
    return (
        <Switch {...switchProps}>
            {routes.map((route, i) => {
                if (route.redirect) {
                    <Route path={route.path}>
                        <Redirect to={route.redirect} />
                    </Route>
                }
                return <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={props =>
                        route.render ? (
                            route.render({ ...props, ...extraProps, route: route })
                        ) : (
                            <route.component {...props} {...extraProps} route={route} />
                        )
                    }
                />
            })}
        </Switch>
    )
}

export default renderRoutes;
