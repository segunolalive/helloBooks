import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';


/**
 * @param {Object} book - book
 * @returns {Object} - Object containing action type and user
 */
export const editBookAction = book => ({
  type: actionTypes.EDIT_BOOK,
  book,
});


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
    }, (error) => {
      notify.error(error.response.data.message);
    })
    .catch((error) => {
      notify.error(error);
    })
);


/**
 * @param {Object} book - book
 * @returns {Object} - Object containing action type and book
 */
export const setBookToEdit = book => ({
  type: actionTypes.SET_BOOK_TO_EDIT,
  book,
});


/**
 * get the book to edit
 * @param  {Number} id book id
 * @return {Object}    redux action
 */
export const bookToEdit = id => dispatch => (
  axios.get(`${API}/books/${id}`)
    .then((response) => {
      dispatch(setBookToEdit(response.data.book));
    }, (error) => {
      notify.error(error.response.data.message);
    })
    .catch((error) => {
      notify.error(error);
    })
);


/**
 * @param {Object} book - book
 * @returns {Object} - Object containing action type and book
 */
export const addBookAction = book => ({
  type: actionTypes.ADD_BOOK,
  book,
});


/**
 * add new book to database
 * @param  {Object} data book data
 * @return {Object}      sends nextwork request
 */
export const addBook = data => () => (
  axios.post(`${API}/books`, data)
    .then((response) => {
      notify.success(response.data.message);
    }, (error) => {
      notify.error(error.response.data.message);
    })
    .catch((error) => {
      notify.error(error);
    })
);


/**
 * action creator for borrowing books
 * @param  {Integer} id book id
 * @return {Object}    action object
 */
const deleteBookAction = id => ({
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
      return response;
    }, (error) => {
      notify.error(error.response.data.message);
    })
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
    }, (error) => {
      notify.error(error.response.data.message);
    })
    .catch(() => {
      notify.error('Something went wrong. Ensure you\'re not' +
      'adding an existing category');
    })
);
