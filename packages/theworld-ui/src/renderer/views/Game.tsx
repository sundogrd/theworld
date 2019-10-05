import * as React from 'react';
import Nav from '../components/Nav';
import { observer, inject } from 'mobx-react';

import '../style/views/game.less';
import GameStore from '@/renderer/store/gameStore';

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

@inject('gameStore')
@observer
class GameComp extends React.Component<{gameStore: GameStore}> {

    handleClick() {
        this.props.gameStore.addValue();
    }

    render() {
        const gameStore = this.props.gameStore;
        console.log(gameStore);
        return (
            <div className="game-view">
                <Nav to="/bundle"/>
                value is :{gameStore.value}
                <button onClick={this.handleClick.bind(this)}></button>
            </div> 
        )
    }
}

export default GameComp

// export default inject('gameStore')(observer(GameComp));
