import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './utils/store';

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
