import actionTypes from './actionTypes';

const signUp = user => ({
  type: actionTypes.SIGN_UP,
  user,
});

export default signUp;
