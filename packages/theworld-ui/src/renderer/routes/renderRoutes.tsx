import * as React from "react";
import { Switch, Route } from "react-router";
import { RouteConfig } from "react-router-config";

function renderRoutes(routes: Array<RouteConfig>, extraProps = {}, switchProps = {}) {
    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => {
                debugger
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
    ) : null;
}

export default renderRoutes;
