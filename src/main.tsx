import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createAppStore from './redux/creaAppStore';

import App from './app/App';

const initialState = {};
const store = createAppStore(initialState);

const rootEl = document.getElementById('app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
);
