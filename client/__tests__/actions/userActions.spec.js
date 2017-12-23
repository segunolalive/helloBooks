import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import mockData, { mockStoreData } from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import actionTypes from '../../actions/actionTypes';
import updateProfile from '../../actions/updateProfile';
import { fetchHistory,
  fetchTransactionHistory } from '../../actions/history';
import Notify from '../__mocks__/Notify';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
window.localStorage = mockLocalStorage;

describe('user Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('updateProfile', () => {
    it('dispatches LOGIN and a success toast on success', () => {
      const user = mockData.authResponse;
      moxios.stubRequest('/api/v1/users', {
        status: 200,
        response: user
      });
      const expectedActions = [{ type: actionTypes.LOGIN, user }];
      const store = mockStore({});
      return store.dispatch(updateProfile({ limit: 2 })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(Notify.success).toHaveBeenCalled();
      });
    });

    it('returns an error toast and no action on failure', () => {
      const user = mockData.authResponse;
      moxios.stubRequest('/api/v1/users', {
        status: 500,
        response: user
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(updateProfile({})).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(Notify.error).toHaveBeenCalled();
      });
    });
  });

  describe('fetchHistory', () => {
    const { allBorrowed } = mockStoreData.transactionReducer;
    it('dispatches FETCHING_HISTORY, GET_ALL_BORROWED and a success toast on success',
      () => {
        moxios.stubRequest('/api/v1/users/1/books', {
          status: 200,
          response: { books: allBorrowed }
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_HISTORY, status: true },
          { type: actionTypes.FETCHING_HISTORY, status: false },
          { type: actionTypes.GET_ALL_BORROWED, books: allBorrowed },
        ];
        const store = mockStore({});
        return store.dispatch(fetchHistory(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('returns an error toast on failure', () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 500,
        response: {}
      });
      const expectedActions = [
        { type: actionTypes.FETCHING_HISTORY, status: true },
        { type: actionTypes.FETCHING_HISTORY, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchHistory(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(Notify.error).toHaveBeenCalled();
      });
    });
  });


  describe('fetchTransactionHistory', () => {
    const { transactions, pagination } = mockStoreData.transactionReducer;
    it('dispatches FETCHING_HISTORY, GET_ALL_BORROWED  and SET_TRANSACTIONS_PAGINATION on success',
      () => {
        moxios.stubRequest('/api/v1/users/1/transactions', {
          status: 200,
          response: { notifications: transactions, metadata: pagination }
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_TRANSACTIONS, status: true },
          { type: actionTypes.FETCHING_TRANSACTIONS, status: false },
          { type: actionTypes.GET_TRANSACTION_HISTORY, transactions },
          { type: actionTypes.SET_TRANSACTIONS_PAGINATION, pagination },
        ];
        const store = mockStore({});
        return store.dispatch(fetchTransactionHistory(null, 1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

    it('dispatches FETCHING_HISTORY, GET_ALL_BORROWED  and SET_TRANSACTIONS_PAGINATION on success',
      () => {
        moxios.stubRequest('/api/v1/users/1/transactions?offset=2&', {
          status: 200,
          response: { notifications: transactions, metadata: pagination }
        });
        const expectedActions = [
          { type: actionTypes.FETCHING_TRANSACTIONS, status: true },
          { type: actionTypes.FETCHING_TRANSACTIONS, status: false },
          { type: actionTypes.GET_MORE_TRANSACTIONS, transactions },
          { type: actionTypes.SET_TRANSACTIONS_PAGINATION, pagination },
        ];
        const store = mockStore({});
        return store.dispatch(fetchTransactionHistory({ offset: 2 }, 1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

    it('returns an error toast on failure', () => {
      moxios.stubRequest('/api/v1/users/1/transactions', {
        status: 500,
        response: {}
      });
      const expectedActions = [
        { type: actionTypes.FETCHING_TRANSACTIONS, status: true },
        { type: actionTypes.FETCHING_TRANSACTIONS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchTransactionHistory(null, 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(Notify.error).toHaveBeenCalled();
      });
    });
  });
});
