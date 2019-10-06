import areaStore from './areaStore';
import playerStore from './playerStore';

const gameStore = () => ({
    area: areaStore(),
    player: playerStore(),
});

export default gameStore;
