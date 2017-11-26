import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';
import queryStringFromObject from '../utils/queryStringFromObject';


/**
 * Action creator for getting list of all books a userr has ever borrowed
 * @param  {Array} books  array of books
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
 * @param  {Integer}    id user id
 * @return {Thunk}      a function that retuns a function (action creator)
 */
export const fetchHistory = id => (dispatch) => {
  dispatch(fetchingHistory(true));
  return axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(fetchingHistory(false));
      dispatch(fetchHistoryAction(response.data.books));
    }).catch((error) => {
      dispatch(fetchingHistory(false));
      return notify.error(error.response.data.message);
    });
};


/**
 * Action creator for getting full transactions history
 * @param  {array} transactions array of transacitons
 * @return {Thunk}              function that returns an action creator
 */
const getTransactionHistory = transactions => ({
  type: actionTypes.GET_TRANSACTION_HISTORY,
  transactions,
});

const getMoreTransactionHistory = books => ({
  type: actionTypes.GET_MORE_TRANSACTIONS,
  books
});

const fetchingTransactions = status => ({
  type: actionTypes.FETCHING_TRANSACTIONS,
  status,
});

/**
 * sets pagination metadata in store
 * @param {Object}  pagination  pagination metadata object
 * @return {Object}                 action object
 */
export const setTransactionPagination = pagination => ({
  type: actionTypes.SET_TRANSACTIONS_PAGINATION,
  pagination
});

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
      notify.error(error.response.data.message);
    });
};
