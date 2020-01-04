import * as React from 'react';
import { observer } from 'mobx-react';
import { set } from 'lodash-es';
import './index.less';
import { checkDataFormat, decodeMessage } from '../client/utils';
import { TStore } from '../store';
import TerminalDisplayer, { TerminalLevel } from './displayer';

const ClientView: React.FunctionComponent<{ store: TStore }> = observer(
    ({ store }: { store?: any }) => {
        React.useEffect(() => {
            const displayer = new TerminalDisplayer();
            displayer.mount('#terminal');
            // 发送时
            displayer.onEnter(function(msg, printer) {
                if (checkDataFormat(msg)) {
                    const data = decodeMessage(msg);
                    printer('Update successful!', TerminalLevel.SUCCESS);
                    const curStore = (store.gameStore as any)[data.type];
                    if (!curStore) {
                        return;
                    }
                    const payload = data.payload;
                    for (const [k, v] of Object.entries(payload)) {
                        set(curStore, k, v);
                    }
                } else {
                    printer('Failed to update!', TerminalLevel.FAILED);
                }
            });
        });

        return <div id="terminal" />;
    },
);

export default ClientView;
