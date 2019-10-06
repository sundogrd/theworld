import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import { EDirection } from '../../../../types/area';
import useStores from '../../../hooks/useStores';

const directions = [
    [
        null,
        {
            desc: '北',
            direction: EDirection.NORTH,
        },
        null,
    ],
    [
        {
            desc: '西',
            direction: EDirection.WEST,
        },
        {
            desc: '南',
            direction: EDirection.SOUTH,
        },
        {
            desc: '东',
            direction: EDirection.EAST,
        },
    ],
];

const TileComp = observer(() => {
    const { gameStore } = useStores();

    return (
        <div className="actions">
            {directions.map((ds, idx) => {
                return ds.map((d, i) => {
                    return (
                        <div
                            key={`${idx}-${i}`}
                            onClick={() => gameStore.player.move(d.direction)}
                            className={(d ? '' : 'hide ') + 'action-block'}
                        >
                            {d ? d.desc : ''}
                        </div>
                    );
                });
            })}
        </div>
    );
});

export default TileComp;
