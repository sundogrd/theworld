import * as React from 'react';
import { observer } from 'mobx-react';
// import './index.less';
import useStores from '../../../hooks/useStores';

const PlayerStateComp = observer(() => {
    const { gameStore } = useStores();
    const { player } = gameStore;
    const attributes = Object.keys(player.attributes);
    return (
        <div className="player-states">
            <p>名称：{player.name}</p>
            {attributes.map((attr: string, idx: number) => {
                return (
                    <p key={idx}>
                        {attr}: {player.attributes[attr]}
                    </p>
                );
            })}
        </div>
    );
});

export default PlayerStateComp;
