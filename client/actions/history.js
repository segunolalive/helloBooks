import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import reportNetworkError from './reportNetworkError';
import queryStringFromObject from '../utils/queryStringFromObject';


/**
 * Action creator for getting list of all books a userr has ever borrowed
 *
 * @param  {Array} books  array of books
 *
 * @return {Object}       redux action with type and books properties
 */
export const fetchHistoryAction = books => ({
  type: actionTypes.GET_ALL_BORROWED,
  books
});

/**
 * @param  {Bool} status
 * @return {Object}      action object
 */
export const fetchingHistory = status => ({
  type: actionTypes.FETCHING_HISTORY,
  status,
});

/**
 * fetch list of all books a user has ever borrowed
 *
 * @param  {Integer}    id user id
 *
 * @return {Promise}       resolves with borrowing history
 */
export const fetchHistory = id => (dispatch) => {
  dispatch(fetchingHistory(true));
  return axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(fetchingHistory(false));
      dispatch(fetchHistoryAction(response.data.books));
    }).catch((error) => {
      dispatch(fetchingHistory(false));
      return reportNetworkError(error);
    });
};


/**
 * Action creator for getting full transactions history
 *
 * @param  {array} transactions array of transacitons
 *
 * @return {Promise}              function that returns an action creator
 */
export const getTransactionHistory = transactions => ({
  type: actionTypes.GET_TRANSACTION_HISTORY,
  transactions,
});

export const getMoreTransactionHistory = transactions => ({
  type: actionTypes.GET_MORE_TRANSACTIONS,
  transactions
});

export const fetchingTransactions = status => ({
  type: actionTypes.FETCHING_TRANSACTIONS,
  status,
});

/**
 * sets pagination metadata in store
 *
 * @param {Object}  pagination  pagination metadata object
 *
 * @return {Object}                 action object
 */
export const setTransactionPagination = pagination => ({
  type: actionTypes.SET_TRANSACTIONS_PAGINATION,
  pagination
});

/**
 * fetch list of all books a user has ever borrowed
 *
 * @param  {pbject}   options
 * @param  {Integer}  id      user id
 *
 * @return {Promise}          resolves with transaction history
 */
export const fetchTransactionHistory = (options, id) => (dispatch) => {
  dispatch(fetchingTransactions(true));
  const query = queryStringFromObject(options);
  const transactionAction = options && options.offset && options.offset > 0 ?
    getMoreTransactionHistory : getTransactionHistory;
  return axios.get(`${API}/users/${id}/transactions${query}`)
    .then((response) => {
      dispatch(fetchingTransactions(false));
      dispatch(transactionAction(response.data.notifications));
      dispatch(setTransactionPagination(response.data.metadata));
    })
    .catch((error) => {
      dispatch(fetchingTransactions(false));
      reportNetworkError(error);
    });
};
