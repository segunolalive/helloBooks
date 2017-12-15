import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';


/**
 * @param {Array} borrowedBooks - array of books borrowed by user
 *
 * @returns {object}            - action object
 */
export const getBorrowedBooksAction = borrowedBooks => ({
  type: actionTypes.GET_BORROWED_BOOKS,
  borrowedBooks,
});

/**
 * @param  {Bool} status
 *
 * @return {object}      action object
 */
export const fetchingBorrowedBooks = status => ({
  type: actionTypes.FETCHING_BORROWED_BOOKS,
  status,
});

/**
* @param {Integer} id - user id
*
* @returns {Promise}  - dispatches action with books user has not returned
*/
export const fetchBorrowedBooks = id => (dispatch) => {
  dispatch(fetchingBorrowedBooks(true));
  return axios.get(`${API}/users/${id}/books?returned=false`)
    .then((response) => {
      dispatch(fetchingBorrowedBooks(false));
      dispatch(getBorrowedBooksAction(response.data.books));
    })
    .catch((error) => {
      dispatch(fetchingBorrowedBooks(false));
      notify.error(error.response.data.message);
    });
};


/**
* @param {object} id - user id
*
* @returns {Promise} - dispatches action with all books ever borrowed by user
*/
export const fetchBorrowingHistory = id => dispatch => (
  axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(getBorrowedBooksAction(response.data.books));
    })
    .catch(error => notify.error(error.response.data.message))
);

/**
 * @param  {integer} id book id
 *
 * @return {object}     action object
 */
export const returnBookAction = id => ({
  type: actionTypes.RETURN_BOOK,
  id,
});


/**
* @param {object} userId - user id
* @param {object} bookId - book id
*
* @returns {Array}       - fetches array of unreturned borrowed books
*/
export const returnBook = (userId, bookId) => dispatch => (
  axios.put(`${API}/users/${userId}/books`, { id: bookId })
    .then(
      (response) => {
        notify.success(response.data.message);
        return dispatch(returnBookAction(bookId));
      })
    .catch(error => notify.error(error.response.data.message))
);

export const suggestedBooks = suggestions => ({
  type: actionTypes.GET_BOOK_SUGGESTIONS,
  suggestions
});

/**
 * fetches book suggestions
*
* @returns {Promise}  - resolves with book suggestions
*/
export const getSuggestedBooks = () => dispatch => (
  axios.get(`${API}/books/suggestions`)
    .then(response => dispatch(suggestedBooks(response.data.suggestions)))
    .catch(error => notify.error(error.response.data.message))
);
