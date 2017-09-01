import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import rootReducer from '../reducers/rootReducer';


const store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware
));

export default store;
