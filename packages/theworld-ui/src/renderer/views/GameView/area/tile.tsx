import { observer } from 'mobx-react';
import * as React from 'react';
import { Tile } from '../../../../types/area';
import { Creature } from '../../../../types/creature';

const TileComp = observer(
    ({ tile, player }: { tile: Tile; player?: Creature }) => {
        return <div className="tile">{player ? '@' : tile.type[0]}</div>;
    },
);

export default TileComp;
