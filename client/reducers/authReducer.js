import actionTypes from '../actions/actionTypes';
import initialState from './initialState';


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
