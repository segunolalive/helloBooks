import {
  login,
  loginUser,
  setLoginStatus
} from '../../actions/login';
import actionTypes from '../../actions/actionTypes';


const user = {
  id: 1,
  firstName: 'segun',
};

describe('Login Actions', () => {
  describe('loginUser', () => {
    it('should create an action to set user object in store', () => {
      const expected = {
        type: actionTypes.LOGIN,
        user
      };
      expect(loginUser(user)).toEqual(expected);
    });
  });
  describe('setLoginStatus', () => {
    it('should create an action to set user\'s login status in store', () => {
      const expected = {
        type: actionTypes.SET_LOGIN_STATUS,
        isLoggedIn: true
      };
      expect(setLoginStatus(true)).toEqual(expected);
    })
  });
});
