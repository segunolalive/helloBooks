import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';

const Materialize = window.Materialize;


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
export const editBook = (id, data) => dispatch => (
  axios.put(`${API}/books/${id}`, data)
    .then((response) => {
      Materialize.toast(response.data.message, 2500, 'teal darken-4');
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch((error) => {
      Materialize.toast(error, 2500, 'red darken-4');
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
      dispatch(setBookToEdit(response.data.data));
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch((error) => {
      Materialize.toast(error, 2500, 'red darken-4');
    })
);


/**
 * add new book to database
 * @param  {Object} data book data
 * @return {Object}      dispatches an action to the redux store
 */
export const addBook = data => dispatch => (
  axios.post(`${API}/books`, data)
    .then((response) => {
      Materialize.toast(response.data.message, 2500, 'teal darken-4');
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch((error) => {
      Materialize.toast(error, 2500, 'red darken-4');
    })
);


/**
 * het book Detail
 * @param  {Object} category new book category
 * @return {Object}          dispatches an action to the redux store
 */
export const addBookCategory = category => dispatch => (
  axios.post(`${API}/books/category`, { category })
    .then((response) => {
      Materialize.toast(response.data.message, 2500, 'teal darken-4');
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch(() => {
      Materialize.toast(`Something went wrong. Ensure you're not adding
        an existing category`, 2500, 'red darken-4'
      );
    })
);
