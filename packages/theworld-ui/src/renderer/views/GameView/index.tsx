import * as React from 'react';
import Nav from '../../components/Nav';
import { observer } from 'mobx-react';
import Area from './area/index';
import Actions from './Actions';
import PlayerStateDisplay from './states/player';
import TileStateDisplay from './states/tile';

import './index.less';

const GameView: React.FunctionComponent<{}> = observer(() => {
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
            <Actions />
        </div>
    );
});

export default GameView;
