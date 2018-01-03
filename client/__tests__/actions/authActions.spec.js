import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import { login } from '../../actions/authActions/login';
import logout from '../../actions/authActions/logout';
import { signUp } from '../../actions/authActions/signup';
import requestResetPassword
  from '../../actions/authActions/requestResetPassword';
import resetPassword from '../../actions/authActions/resetPassword';
import actionTypes from '../../actions/actionTypes';
import Notify from '../__mocks__/Notify';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
window.localStorage = mockLocalStorage;


describe('Auth Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('login', () => {
    it('creates LOGIN, AUTH_LOADING and SET_LOGIN_STATUS when login is successful',
      () => {
        const { authResponse } = mockData;
        moxios.stubRequest('/api/v1/users/signin', {
          status: 200,
          response: authResponse
        });
        const expectedActions = [
          { type: actionTypes.AUTH_LOADING, state: true },
          { type: actionTypes.LOGIN, user: authResponse },
          { type: actionTypes.SET_LOGIN_STATUS, isLoggedIn: true },
          { type: actionTypes.AUTH_LOADING, state: false }
        ];
        const store = mockStore({});
        return store.dispatch(login({})).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });


    it('creates AUTH_LOADING and SET_LOGIN_STATUS on login failure', () => {
      const { authResponse } = mockData;
      moxios.stubRequest('/api/v1/users/signin', {
        status: 400,
        response: authResponse
      });
      const expectedActions = [
        { type: actionTypes.AUTH_LOADING, state: true },
        { type: actionTypes.AUTH_LOADING, state: false }
      ];
      const store = mockStore({});
      return store.dispatch(login({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('signup', () => {
    it('creates LOGIN, AUTH_LOADING and SET_LOGIN_STATUS when sign up is successful',
      () => {
        const { authResponse } = mockData;
        moxios.stubRequest('/api/v1/users/signup', {
          status: 200,
          response: authResponse
        });
        const expectedActions = [
          { type: actionTypes.AUTH_LOADING, state: true },
          { type: actionTypes.SIGN_UP, user: authResponse },
          { type: actionTypes.SET_LOGIN_STATUS, isLoggedIn: true },
          { type: actionTypes.AUTH_LOADING, state: false }
        ];
        const store = mockStore({});
        return store.dispatch(signUp({})).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    it('creates AUTH_LOADING on signup failure', () => {
      const { authResponse } = mockData;
      moxios.stubRequest('/api/v1/users/signup', {
        status: 400,
        response: authResponse
      });
      const expectedActions = [
        { type: actionTypes.AUTH_LOADING, state: true },
        { type: actionTypes.AUTH_LOADING, state: false }
      ];
      const store = mockStore({});
      return store.dispatch(signUp({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('logout', () => {
    it('creates LOGOUT when logout action is successful', (done) => {
      const store = mockStore({});
      const expectedActions = [{ type: actionTypes.LOGOUT }];
      store.dispatch(logout());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('requestResetPassword', () => {
    it('provides a notification on success', (done) => {
      moxios.stubRequest('/api/v1/users/forgot-password', {
        status: 200,
        response: mockData.authResponse
      });
      const store = mockStore({});
      store.dispatch(requestResetPassword('email')).then(() => {
        expect(Notify.success).toHaveBeenCalled();
        done();
      });
    });

    it('provides a notification on failure', (done) => {
      moxios.stubRequest('/api/v1/users/forgot-password', {
        status: 500,
        response: mockData.authResponse
      });
      const store = mockStore({});
      store.dispatch(requestResetPassword('email')).then(() => {
        expect(Notify.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('resetPassword', () => {
    it('provides a notification on success', (done) => {
      moxios.stubRequest('/api/v1/users/reset-password/1234yyjhkopi123', {
        status: 200,
        response: mockData.authResponse
      });
      const store = mockStore({});
      store.dispatch(resetPassword('password', '1234yyjhkopi123')).then(() => {
        expect(Notify.success).toHaveBeenCalled();
        done();
      });
    });

    it('provides a notification on failure', (done) => {
      moxios.stubRequest('/api/v1/users/reset-password/1234yyjhkopi123', {
        status: 500,
        response: mockData.authResponse
      });
      const store = mockStore({});
      store.dispatch(resetPassword('password', '1234yyjhkopi123')).then(() => {
        expect(Notify.error).toHaveBeenCalled();
        done();
      });
    });
  });
});
