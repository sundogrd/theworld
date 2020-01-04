import CTile from './tile';
import * as React from 'react';
import { observer } from 'mobx-react';
import { Tile } from '@/types/area';
import { Creature } from '@/types/creature';
import useStores from '../../../hooks/useStores';
import './index.less';

function isCreatureInTile(creature: Creature, tile: Tile): boolean {
    const pPositon = creature.position;
    const tPosition = tile.position;
    if (pPositon.x === tPosition.x && pPositon.y === tPosition.y) {
        return true;
    }
    return false;
}

const Area = observer(() => {
    const { gameStore } = useStores();
    const { area, player } = gameStore;
    const { map } = area;

    return (
        <div className="area">
            {map.map((row: Tile[], y: number) => {
                return row.map((col: Tile, x: number) => {
                    if (player.position.x === x && player.position.y === y) {
                        return (
                            <CTile
                                tile={col}
                                player={true}
                                key={`${y}-${x}`}
                            />
                        )
                    }
                    return (
                        <CTile
                            tile={col}
                            player={null}
                            key={`${y}-${x}`}
                        />
                    );
                });
            })}
        </div>
    );
});

export default Area;
