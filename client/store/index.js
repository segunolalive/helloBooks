import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import throttle from 'lodash/throttle';
import expireSession from '../utils/expireSession';


import rootReducer from '../reducers/rootReducer';
import { loadState, saveState } from '../utils/saveLocally';
import initialState from '../reducers/initialState';


const preloadedState = loadState() || initialState;

const store = createStore(rootReducer, preloadedState,
  compose(applyMiddleware(thunkMiddleware),
    process.env.NODE_ENV === 'development' &&
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

expireSession();

export default store;
