import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';

const Materialize = window.Materialize;


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
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
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
 * @param  {integer} userId user id
 * @param  {integer} bookId book id
 * @return {any}    dispatches an action to store
 */
export const borrowBook = (userId, bookId) => dispatch => (
  axios.post(`${API}/users/${userId}/books`, { id: bookId })
    .then((response) => {
      dispatch(borrowBookAction(bookId));
      Materialize.toast(response.data.message, 2500, 'teal darken-4');
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch((error) => {
      Materialize.toast(error, 2500, 'red darken-4');
    })
);


/**
 * action creator for borrowing books
 * @param  {Integer} id book id
 * @return {Object}    action object
 */
const editBookAction = id => ({
  type: actionTypes.EDIT_BOOK,
  id,
});


/**
 * send request to borrow a book from library
 * @param  {integer} bookId book id
 * @return {any}    dispatches an action to store
 */
export const editBook = bookId => dispatch => (
  axios.put(`${API}/books/${bookId}`, { id: bookId })
    .then((response) => {
      dispatch(editBookAction(bookId));
      Materialize.toast(response.data.message, 2500, 'teal darken-4');
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
    .catch((error) => {
      Materialize.toast(error, 2500, 'red darken-4');
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
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
);

/**
 * @param  {Array} categories book categories
 * @return {Object}    dispatches an action to store
 */
const getBookCategoriesAction = categories => ({
  type: actionTypes.GET_BOOK_CATEGORIES,
  categories,
});

/**
 * get book cattegories
 * @return {any} dispatches an action to the redux store
 */
export const getBookCategories = () => (dispatch) => {
  axios.get(`${API}/books/category`)
    .then(categories => (
      dispatch(getBookCategoriesAction(categories.data.data))
    ), (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    });
};


export const filterBooksByCategory = category => (dispatch) => {};
