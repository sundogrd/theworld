import * as React from 'react';
import Nav from '../../components/Nav';
import { observer } from 'mobx-react';
import './index.less';
import useStores from '../../hooks/useStores';
import Area from './area/index';
import Actions from './actions/index';
import PlayerStateDisplay from './states/player';
import TileStateDisplay from './states/tile';

const GameView: React.FunctionComponent<{}> = observer(() => {
    const { gameStore } = useStores();
    return (
        <div className="game-view">
            <Nav to="/bundle" />
            <div className="non-action">
                <Area />
                <div className="states-wrapper">
                    <PlayerStateDisplay />
                    <TileStateDisplay />
                </div>
            </div>
            <div className="action">
                <div className="actions"></div>
                <div className="move-ops">
                    <Actions />
                </div>
            </div>
        </div>
    );
});

export default GameView;
