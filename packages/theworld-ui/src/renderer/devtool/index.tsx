import * as React from 'react';
import { observer } from 'mobx-react';
import './index.less';
import useStores from '../hooks/useStores';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'
import { AttachAddon } from 'xterm-addon-attach';
import WsClient from '../../../test/ws/client';


const ClientView: React.FunctionComponent<{}> = observer(() => {
  const { gameStore } = useStores();
  React.useEffect(() => {
    let curMessage = '';
    const term = new Terminal();
    const wsClient = new WsClient('ws://localhost:8880');
    term.focus();
    term.write('$ ');

    term.onKey((e: { key: string, domEvent: KeyboardEvent }) => {
      const ev = e.domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
      if (ev.keyCode === 13) {
        if (curMessage) {
          if (wsClient.send(curMessage)) {
            term.write('\r\n** Your directive was received by server successfully!');
          } else {
            term.write('\r\n## Wrong format directive!');
          }
        }
        console.log(curMessage)
        term.write('\r\n$ ');
        curMessage = '';
      } else if (ev.keyCode === 8) {
        if (term.buffer.cursorX > 2) {
          term.write('\b \b');
        }
      } else if (printable) {
        term.write(e.key);
        curMessage += e.key;
      }
    });
    // const client = new WsClient();
    // const socket = new WebSocket('wss://docker.example.com/containers/mycontainerid/attach/ws');
    // const attachAddon = new AttachAddon(socket);
    // Attach the socket to term
    // term.loadAddon(attachAddon);
    term.open(document.getElementById('terminal'));
  });

  return (
    <div id="terminal" />
  );
});

export default ClientView;