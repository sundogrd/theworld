import * as React from 'react';
import Nav from '../components/Nav';
// import { observer, inject } from 'mobx-react';
import { observer, useObservable } from 'mobx-react-lite'

import '../style/views/game.less';
// import GameStore from '@/renderer/store/gameStore';
import useStores from '../hooks/useStores';


// function GameComp({gameStore}: {gameStore: GameStore}) {
//     console.log(gameStore.addValue)
//     return (
//         <div className="game-view">
//             <Nav to="/bundle"/>
//             value is :{gameStore.value}
//             <button onClick={gameStore.addValue}></button>
//         </div>
//     )
// }

const GameComp = observer(() => {
    const { gameStore } = useStores()

    const handleClick = () => {
        gameStore.addValue();
    }
    console.log(gameStore);
    return (
        <div className="game-view">
            <Nav to="/bundle"/>
          value is :{gameStore.value}
            <button onClick={handleClick}></button>
        </div>
    )
})

export default GameComp
