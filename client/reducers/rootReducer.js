import { combineReducers } from 'redux';

import authReducer from './authReducer';
import bookReducer from './bookReducer';
import actionTypes from '../actions/actionTypes';


const appReducer = combineReducers(
  { authReducer, bookReducer }
);


const rootReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return { authReducer: {}, bookReducer: {} };
    default:
      return appReducer(state, action);
  }
};


export default rootReducer;
