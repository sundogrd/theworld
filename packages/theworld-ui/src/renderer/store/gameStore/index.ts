import areaStore from './areaStore';
import playerStore from './playerStore';

export type TGameStore = {
    area: ReturnType<typeof areaStore>;
    player: ReturnType<typeof playerStore>;
};

const gameStore = () => ({
    area: areaStore(),
    player: playerStore(),
});

export default gameStore;
