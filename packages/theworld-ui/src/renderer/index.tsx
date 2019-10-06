import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
import './style/reset.css';
const root = document.getElementById('app');

// import DevTools, {configureDevtool} from 'mobx-react-devtools';
// configureDevtool({
//     // Turn on logging changes button programmatically:
//     logEnabled: true,
//     // Turn off displaying components updates button programmatically:
//     updatesEnabled: true,
//     // Log only changes of type `reaction`
//     // (only affects top-level messages in console, not inside groups)
//     logFilter: change => true,
// });

ReactDOM.render(
    <div>
    <AppContainer>
        <App />
    </AppContainer>
    {/* <DevTools /> */}
    </div>,
    root,
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app', () => {
        // tslint:disable-next-line:no-require-imports
        const HotApp = require('./app').default;
        ReactDOM.render(
            <AppContainer>
                <HotApp />
            </AppContainer>,
            root,
        );
    });
}
