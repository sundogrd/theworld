import * as React from 'react';
import Home from '../views/HomeView';
import Game from '../views/GameView';
import Bundle from '../views/BundleView';
import Records from '../views/RecordsView';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/home',
        // eslint-disable-next-line react/display-name
        component: () => <Redirect to="/home"/>,
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

export default routes
