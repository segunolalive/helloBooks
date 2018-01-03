import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';
import './static/index.scss';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
