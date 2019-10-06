import gameStore from './gameStore';

export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
        gameStore: gameStore(),
    }
}

export type TStore = ReturnType<typeof createStore>
