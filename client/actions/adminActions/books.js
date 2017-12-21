import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';


/**
 * edit book Detail
 * @param  {Integer} id book Id
 * @param  {Object} data book data with with to update database
 * @return {Object}      dispatches an action to the redux store
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
 * @param  {Object} data book data
 * @return {Object}      sends nextwork request
 */
export const addBook = data => () => (
  axios.post(`${API}/books`, data)
    .then(response => notify.success(response.data.message))
    .catch(error => notify.error(error.response.data.message))
);


/**
 * action creator for borrowing books
 * @param  {Integer} id book id
 * @return {Object}    action object
 */
export const deleteBookAction = id => ({
  type: actionTypes.DELETE_BOOK,
  id,
});


/**
 * send request to borrow a book from library
 * @param  {integer} bookId book id
 * @return {any}    dispatches an action to store
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
 * het book Detail
 * @param  {Object} category new book category
 * @return {Object}          sends nextwork request
 */
export const addBookCategory = category => () => (
  axios.post(`${API}/books/category`, { category })
    .then((response) => {
      notify.success(response.data.message);
    })
    .catch(error => notify.error(error.response.data.message))
);
