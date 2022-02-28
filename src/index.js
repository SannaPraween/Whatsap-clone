import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reducer, { initialState } from './reducer';
// import * as serviceWorker from "./serviceWorker";
import { StateProvider } from './StateProvider';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
