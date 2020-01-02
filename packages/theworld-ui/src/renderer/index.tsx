import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
import './style/reset.css';
const root = document.getElementById('app');

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    root,
);
