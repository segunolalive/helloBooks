import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';

const Materialize = window.Materialize;


/**
 * @param {Array} borrowedBooks - array of books borrowed by user
 * @returns {Object} - action object
 */
export const getBorrowedBooksAction = borrowedBooks => ({
  type: actionTypes.GET_BORROWED_BOOKS,
  borrowedBooks,
});


/**
* @param {object} id - user id
* @returns {any} - dispatches action with books user has not returned
*/
export const fetchBorrowedBooks = id => (dispatch) => {
  axios.get(`${API}/users/${id}/books?returned=false`)
    .then((response) => {
      dispatch(getBorrowedBooksAction(response.data.data));
    });
};


/**
* @param {object} id - user id
* @returns {any} - dispatches action with all books ever borrowed by user
*/
export const fetchBorrowingHistory = id => (dispatch) => {
  axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(getBorrowedBooksAction(response.data.data));
    });
};

/**
 * @param  {integer} id book id
 * @return {Object}    action object
 */
const returnBookAction = id => ({
  type: actionTypes.RETURN_BOOK,
  id,
});


/**
* @param {object} userId - user id
* @param {object} bookId - book id
* @returns {any} - fetches array of unreturned borrowed books
*/
export const returnBook = (userId, bookId) => dispatch => (
  axios.put(`${API}/users/${userId}/books`, { id: bookId })
    .then(
      (response) => {
        dispatch(returnBookAction(bookId));
        Materialize.toast(response.data.message, 2500, 'teal darken-4');
      },
      (error) => {
        Materialize.toast(error.response.data.message, 2500, 'red darken-4');
      }
    )
    .catch((err) => {
      Materialize.toast(err.response.data.message, 2500, 'red darken-4');
    })
);
