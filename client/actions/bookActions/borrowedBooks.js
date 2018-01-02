import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';


/**
 * @param {Array} borrowedBooks - array of books borrowed by user
 *
 * @returns {Object}            - action object
 */
export const getBorrowedBooksAction = borrowedBooks => ({
  type: actionTypes.GET_BORROWED_BOOKS,
  borrowedBooks,
});

/**
 * @param  {Bool} status
 *
 * @return {Object}      action object
 */
export const fetchingBorrowedBooks = status => ({
  type: actionTypes.FETCHING_BORROWED_BOOKS,
  status,
});

/**
* @param {object} id - user id
* @returns {any} - dispatches action with books user has not returned
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
* @param {Object} id - user id
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
 * @return {Object}     action object
 */
export const returnBookAction = id => ({
  type: actionTypes.RETURN_BOOK,
  id,
});


/**
* @param {Object} userId - user id
* @param {Object} bookId - book id
*
* @returns {Promise}     - resolves with an array of unreturned borrowed books
*/
export const returnBook = (userId, bookId) => dispatch => (
  axios.put(`${API}/users/${userId}/books`, { id: bookId })
    .then(
      (response) => {
        notify.success(response.data.message);
        return dispatch(returnBookAction(bookId));
      })
    .catch(error => reportNetworkError(error))
);

/**
 * @param {Array}    suggestions
*
* @returns {Object}  action object
*/
export const suggestedBooks = suggestions => ({
  type: actionTypes.GET_BOOK_SUGGESTIONS,
  suggestions
});

/**
 * fetches book suggestions
*
* @returns {Promise}  - resolves with an array ofbook suggestions
*/
export const getSuggestedBooks = () => dispatch => (
  axios.get(`${API}/books/suggestions`)
    .then(response => dispatch(suggestedBooks(response.data.suggestions)))
    .catch(error => reportNetworkError(error))
);

/**
 * @param {string}    url
*
* @returns {Object}   action object
*/
export const setBookToRead = url => ({
  type: actionTypes.SET_BOOK_TO_READ,
  url
});

/**
 * @param {string}     url
*
* @returns {Function}  functions that dispatches an action
*/
export const readBook = url => dispatch => (
  dispatch(setBookToRead(url))
);
