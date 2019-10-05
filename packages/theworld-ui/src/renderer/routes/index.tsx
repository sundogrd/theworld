import * as React from 'react';
import Home from '../views/Home';
import Game from '../views/Game';
import Bundle from '../views/Bundle';
import Records from '../views/Records';
import { Route, Redirect } from 'react-router-dom';

export const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/bundle',
        component: Bundle,
    },
    {
        path: '/game',
        component: Game,
    },
    {
        path: '/records',
        component: Records,
    },
];

export function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            render={props =>
                route.redirect ? (
                    <Redirect from={route.path} to={route.redirect}></Redirect>
                ) : (
                    <route.component {...props} routes={route.routes} />
                )
            }
        />
    );
}
