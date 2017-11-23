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
const fetchHistoryAction = books => ({
  type: actionTypes.GET_ALL_BORROWED,
  books
});


/**
 * fetch list of all books a user has ever borrowed
 * @param  {Integer} id user id
 * @return {Thunk}      a function that retuns a function (action creator)
 */
export const fetchHistory = id => dispatch => (
  axios.get(`${API}/users/${id}/books`)
    .then(response => dispatch(fetchHistoryAction(response.data.books)),
      error => notify.error(error.response.data.message)
    ).catch(error => notify.error(error.response.data.message))
);

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

const gettingMore = status => ({
  type: actionTypes.IS_FETCHING_TRANSACTIONS,
  status,
});

/**
 * sets pagination metadata in store
 * @param {Object}  paginationData  pagination metadata object
 * @return {Object}                 action object
 */
export const setTransactionPagination = paginationData => ({
  type: actionTypes.SET_TRANSACTIONS_PAGINATION,
  pagination: paginationData
});

export const fetchTransactionHistory = (options, id) => (dispatch) => {
  const query = queryStringFromObject(options);
  const transactionAction = options && options.offset && options.offset > 0 ?
    getMoreTransactionHistory : getTransactionHistory;
  return axios.get(`${API}/users/${id}/transactions${query}`)
    .then((response) => {
      dispatch(gettingMore(false));
      dispatch(transactionAction(response.data.notifications));
      dispatch(setTransactionPagination(response.data.metadata));
    }, (error) => {
      dispatch(gettingMore(false));
      notify.error(error.response.data.message);
    })
    .catch((error) => {
      dispatch(gettingMore(false));
      notify.error(error.response.data.message);
    });
};
