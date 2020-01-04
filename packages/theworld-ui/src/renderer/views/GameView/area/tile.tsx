import { observer } from 'mobx-react';
import * as React from 'react';
import { Tile } from '../../../../types/area';

const Tile = observer(({ tile, player }: { tile: Tile; player?: boolean }) => {
    return <div className="tile">{player ? '@' : tile.type[0]}</div>;
});

export default Tile;
