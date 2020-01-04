import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';

import "react-grid-layout/css/styles.css"
// import "react-resizable/css/style.css"
import './index.less';

// for test
const actions = {
    "move-north": {
        id: "move-north",
        name: "向北走",
        short: "w",
    }
}

const Actions = observer(() => {
    const layout = [
        {i: 'w', x: 1, y: 0, w: 1, h: 1},
        {i: 's', x: 1, y: 1, w: 1, h: 1},
        {i: 'a', x: 0, y: 0, w: 1, h: 2},
        {i: 'd', x: 2, y: 0, w: 1, h: 2}
    ];
    return (
        <div className="actions">
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div className={"action"} key="w">上</div>
                <div className={"action"} key="s">下</div>
                <div className={"action"} key="a">左</div>
                <div className={"action"} key="d">右</div>
            </GridLayout>
        </div>
    );
});

export default Actions;
