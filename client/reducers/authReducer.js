import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.user;
    case actionTypes.SIGN_UP:
      return action.user;
    case actionTypes.UPDATE_PROFILE:
      return action.user;
    default:
      return state;
  }
};
