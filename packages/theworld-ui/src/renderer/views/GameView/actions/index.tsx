import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';

import "react-grid-layout/css/styles.css"
// import "react-resizable/css/style.css"
import './index.less';

// for test
const actions: Record<string, Action> = {
    "move-north": {
        id: "move-north",
        name: "向北走",
        shortcut: "w",
    },
    "move-south": {
        id: "move-south",
        name: "向南走",
        shortcut: "s",
    },
    "move-west": {
        id: "move-west",
        name: "向西走",
        shortcut: "a",
    },
    "move-east": {
        id: "move-east",
        name: "向东走",
        shortcut: "d",
    }
}

const layout = [
    {i: 'move-north', x: 1, y: 0, w: 1, h: 1},
    {i: 'move-south', x: 1, y: 1, w: 1, h: 1},
    {i: 'move-west', x: 0, y: 0, w: 1, h: 2},
    {i: 'move-east', x: 2, y: 0, w: 1, h: 2}
];

const Actions = observer(() => {

    return (
        <div className="actions">
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                {
                    Object.keys(actions).map(actionId => {
                        return (
                            <div className={"action"} key={actionId}>{actions[actionId].name}</div>
                        )
                    })
                }
            </GridLayout>
        </div>
    );
});

export default Actions;
