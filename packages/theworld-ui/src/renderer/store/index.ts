import BundleStore from './bundleStore';
import GameStore from './gameStore';

class Store {
    bundleStore: BundleStore
    gameStore: GameStore
    constructor() {
        this.bundleStore = new BundleStore();
        this.gameStore = new GameStore();
    }
}

export default new Store();