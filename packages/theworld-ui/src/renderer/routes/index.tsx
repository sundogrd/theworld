// import * as React from 'react';
import Home from '../views/HomeView';
import Game from '../views/GameView';
import Bundle from '../views/BundleView';
import Records from '../views/RecordsView';
import { RouteConfig } from './renderRoutes';

const routes: Array<RouteConfig> = [
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
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/',
        redirect: '/home',
        exact: true,
    },
];

export default routes
