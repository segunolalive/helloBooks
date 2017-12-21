import { combineReducers } from 'redux';

import authReducer from './authReducer';
import bookReducer from './bookReducer';
import notificationReducer from './notificationReducer';
import transactionReducer from './transactionReducer';
import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


const appReducer = combineReducers(
  { authReducer, bookReducer, notificationReducer, transactionReducer }
);

const rootReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return appReducer(state, action);
  }
};


export default rootReducer;
