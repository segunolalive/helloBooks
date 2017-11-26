import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';


/**
 * @param {Array} borrowedBooks - array of books borrowed by user
 * @returns {Object} - action object
 */
export const getBorrowedBooksAction = borrowedBooks => ({
  type: actionTypes.GET_BORROWED_BOOKS,
  borrowedBooks,
});

/**
 * @param  {Bool} status
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
    }, (error) => {
      dispatch(fetchingBorrowedBooks(false));
      notify.error(error.response.data.message);
    })
    .catch((error) => {
      dispatch(fetchingBorrowedBooks(false));
      notify.error(error);
    });
};


/**
* @param {object} id - user id
* @returns {any} - dispatches action with all books ever borrowed by user
*/
export const fetchBorrowingHistory = id => dispatch => (
  axios.get(`${API}/users/${id}/books`)
    .then((response) => {
      dispatch(getBorrowedBooksAction(response.data.data));
    }, error => notify.error(error.response.data.message))
    .catch(error => notify.error(error))
);

/**
 * @param  {integer} id book id
 * @return {Object}    action object
 */
export const returnBookAction = id => ({
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
        notify.success(response.data.message);
        return dispatch(returnBookAction(bookId));
      },
      error => notify.error(error.response.data.message)
    )
    .catch(error => notify.error(error.response.data.message))
);
