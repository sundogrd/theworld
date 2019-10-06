import * as React from 'react';
import Nav from '../../components/Nav';
import { observer } from 'mobx-react';
import './index.less';
import useStores from '../../hooks/useStores';
import CArea from './area/index';
import CActions from './actions/index';
import CPlayerState from './states/player';
import CTileState from './states/tile';

const GameView = observer(() => {
    const { gameStore } = useStores();
    return (
        <div className="game-view">
            <Nav to="/bundle" />
            <div className="non-action">
                <CArea />
                <div className="states-wrapper">
                    <CPlayerState />
                    <CTileState />
                </div>
            </div>
            <div className="action">
                <div className="actions"></div>
                <div className="move-ops">
                    <CActions />
                </div>
            </div>
        </div>
    );
});

export default GameView;
