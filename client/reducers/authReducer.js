import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


/**
 * Reducer that handles user authentication
 *
 * @param {Object} state   initial state for the auth section of the store
 * @param {Object} action  the dispatched action
 *
 * @returns {Object}       new state of the auth section of the store
 */
export default (state = initialState.authReducer, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOADING:
      return { ...state, authLoading: action.state };
    case actionTypes.LOGIN:
      return { ...state, user: action.user };
    case actionTypes.SIGN_UP:
      return { ...state, user: action.user };
    case actionTypes.SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};
