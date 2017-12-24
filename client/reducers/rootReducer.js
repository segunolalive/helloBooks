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

/**
 * combines all reducers into one
 *
 * @param {Object} state   initial state of the store
 * @param {Object} action  the dispatched action
 *
 * @returns {Object}       new state of the store
 */
const rootReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return appReducer(state, action);
  }
};


export default rootReducer;
