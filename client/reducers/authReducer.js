import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
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
