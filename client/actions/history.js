import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';


const fetchHistoryAction = books => ({
  type: actionTypes.GET_ALL_BORROWED,
  books
});


export const fetchHistory = id => dispatch => (
  axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(fetchHistoryAction(response.data.data));
    })
);


const getTransactionHistory = transactions => ({
  type: actionTypes.GET_TRANSACTION_HISTORY,
  transactions,
});

export const fetchTransactionHistory = id => dispatch => (
  axios.get(`${API}/users/${id}/transactions`)
    .then((response) => {
      dispatch(getTransactionHistory(response.data.data));
    })
);
