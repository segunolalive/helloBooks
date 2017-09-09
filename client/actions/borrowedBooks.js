import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';


/**
 * @param {Array} borrowedBooks - array of books borrowed by user
 * @returns {Object} - action object
 */
export const getBorrowedBooks = borrowedBooks => ({
  type: actionTypes.GET_BORROWED_BOOKS,
  borrowedBooks,
});

/* @param {object} id - user id
* @returns {any} - dispatches action with books borrowed by user
*/
export const fetchBorrowedBooks = id => (dispatch) => {
  axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(getBorrowedBooks(response.data.data));
    });
};
