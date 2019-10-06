import * as React from 'react';
import { observer } from 'mobx-react';
// import './index.less';
import useStores from '../../../hooks/useStores';
import { Creature } from '@/types/creature';
import { Area, Tile } from '@/types/area';

function getPlayerTile(player: Creature, area: Area): Tile {
    const { x, y } = player.position;
    return area.map[y][x];
}

const TileStateComp = observer(() => {
    const { gameStore } = useStores();
    const { player, area } = gameStore;
    const tile = getPlayerTile(player, area);

    return (
        <div className="tile-states">
            <p>名称：{tile.type}</p>
        </div>
    );
});

export default TileStateComp;
