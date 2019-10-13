import gameStore from './gameStore';
import routerStore from './routerStore';

export type TStore = {
    gameStore: ReturnType<typeof gameStore>;
    routerStore: ReturnType<typeof routerStore>;
}

export function createStore(): TStore {
    // note the use of this which refers to observable instance of the store
    return {
        gameStore: gameStore(),
        routerStore: routerStore(),
    }
}
