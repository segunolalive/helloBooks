import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';


/**
 * action creator for getting books
 * @param  {Array} books array of book objects
 * @return {Object}       action objects
 */
export const getBooks = books => ({
  type: actionTypes.GET_BOOKS,
  books,
});


/**
 * fetch books in thhe Library
 * @return {any} dispatches an action
 */
export const fetchBooks = () => dispatch => (
  axios.get(`${API}/books`)
    .then((response) => {
      dispatch(getBooks(response.data.data));
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red');
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, 2500, 'red');
    })
);

/**
 * action creator for borrowing books
 * @param  {Integer} id book id
 * @return {Object}    action object
 */
const borrowBookAction = id => ({
  type: actionTypes.BORROW_BOOK,
  id,
});


/**
 * send request to borrow a book from library
 * @param  {integer} id book id
 * @return {any}    dispatches an action to store
 */
export const borrowBook = (userId, bookId) => dispatch => (
  axios.post(`${API}/users/${userId}/books`, { id: bookId })
    .then((response) => {
      dispatch(borrowBookAction(bookId));
      Materialize.toast(response.data.message, 2500, 'green');
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red');
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, 2500, 'red');
    })
);
