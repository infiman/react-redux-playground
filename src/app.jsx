import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import uiStore from 'uiStore';
import Main from './screens/Main';
import '!style!css!sass!./assets/stylesheets/styles.scss';

ReactDOM.render(
  <Provider store={{ ...uiStore }}>
    <Main />
  </Provider>,
  document.getElementById('bsb')
);
