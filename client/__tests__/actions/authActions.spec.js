import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import { login } from '../../actions/authActions/login';
import { signUp } from '../../actions/authActions/signup';
import actionTypes from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
window.localStorage = mockLocalStorage;


describe('Auth Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('login', () => {
    it('creates LOGIN, AUTH_LOADING and SET_LOGIN_STATUS' +
      ' when login is successful', () => {
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
    it('creates LOGIN, AUTH_LOADING and SET_LOGIN_STATUS' +
      ' when sign up is successful', () => {
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
});
