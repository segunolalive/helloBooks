import { combineReducers, applyMiddleWare } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from './authReducer';


const rootReducer = combineReducers(
  { authReducer }
);

export default rootReducer;
