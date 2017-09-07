import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

import rootReducer from '../reducers/rootReducer';


const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
