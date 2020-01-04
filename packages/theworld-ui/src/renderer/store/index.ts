import gameStore from './gameStore';

export type TStore = {
    gameStore: ReturnType<typeof gameStore>;
}

export function createStore(): TStore {
    // note the use of this which refers to observable instance of the store
    return {
        gameStore: gameStore(),
    }
}
