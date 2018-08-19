import React from 'react';
import './index.css';
import { render } from 'react-dom';
import * as redux from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <redux.Provider store={store}>
    <App />
  </redux.Provider>,
  document.getElementById('root')
);
