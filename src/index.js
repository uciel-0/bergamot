import React from 'react';
import {createRoot} from 'react-dom/client';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './store/Store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <Store>
    <App />
  </Store>
</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
