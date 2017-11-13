import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';


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
    .then(
      response => dispatch(getBooks(response.data.books)),
      error => notify.error(error.response.data.message)
    )
    .catch(error => notify.error(error.response.data.message))
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
      notify.success(response.data.message);
      return dispatch(borrowBookAction(bookId));
    }, error => notify.error(error.response.data.message))
    .catch(error => notify.error(error))
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
export const getBookCategories = () => dispatch => (
  axios.get(`${API}/books/category`)
    .then(response => (
      dispatch(getBookCategoriesAction(response.data.categories))
    ), error => notify.error(error.response.data.message))
);


export const filterBooksByCategory = category => dispatch => (
  axios.get(`${API}/books?category=${category}`)
    .then(response => dispatch(getBooks(response.data.books)))
    .catch(error => notify.error(error.response.data.message))
);
