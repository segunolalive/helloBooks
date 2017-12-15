import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';


/**
 * edit book Detail
 *
 * @param  {Integer} id book Id
 * @param  {Object} data book data with with to update database
 *
 * @return {object}      dispatches an action to the redux store
 */
export const editBook = (id, data) => () => (
  axios.put(`${API}/books/${id}`, data)
    .then((response) => {
      notify.success(response.data.message);
    })
    .catch(error => notify.error(error.response.data.message))
);


/**
 * add new book to database
 *
 * @param  {object} data  book data
 *
 * @return {Promise}      resolves with success message
 */
export const addBook = data => () => (
  axios.post(`${API}/books`, data)
    .then(response => notify.success(response.data.message))
    .catch(error => notify.error(error.response.data.message))
);


/**
 * action creator for borrowing books
 *
 * @param  {Integer} id book id
 *
 * @return {object}     action object
 */
export const deleteBookAction = id => ({
  type: actionTypes.DELETE_BOOK,
  id,
});


/**
 * send request to borrow a book from library
 *
 * @param  {integer} bookId book id
 *
 * @return {Promise}    dispatches an action to store
 */
export const deleteBook = bookId => dispatch => (
  axios.delete(`${API}/books/${bookId}`, { id: bookId })
    .then((response) => {
      dispatch(deleteBookAction(bookId));
      notify.success(response.data.message);
      return response;
    })
    .catch(error => notify.error(error.response.data.message))
);

/**
 * action creator for adding book category
 *
 * @param  {object} category
 *
 * @return {object}     action object
 */
export const addCategory = category => ({
  type: actionTypes.ADD_BOOK_CATEGORY,
  category,
});


/**
 * addds a new book category
 *
 * @param  {object} category new book category
 *
 * @return {Promise}          resolves with success message
 */
export const addBookCategory = category => dispatch => (
  axios.post(`${API}/books/category`, { category })
    .then((response) => {
      dispatch(addCategory(response.data.category));
      notify.success(response.data.message);
    })
    .catch(error => notify.error(error.response.data.message))
);
