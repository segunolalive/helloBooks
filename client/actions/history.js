import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';


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

export const fetchTransactionHistory = id => dispatch => (
  axios.get(`${API}/users/${id}/transactions`)
    .then(response => (
      dispatch(getTransactionHistory(response.data.notifications))
    ), error => notify.error(error.response.data.message))
    .catch(error => notify.error(error.response.data.message))
);
