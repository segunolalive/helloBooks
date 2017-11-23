import axios from 'axios';

import actionTypes from '../actions/actionTypes';
import API from './api';
import notify from './notify';
import queryStringFromObject from '../utils/queryStringFromObject';


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
 * action creator for getting books
 * @param  {Array} books array of book objects
 * @return {Object}       action object
 */
export const getMoreBooks = books => ({
  type: actionTypes.GET_MORE_BOOKS,
  books,
});


/**
 * sets pagination metadata in store
 * @param {Object}  paginationData  pagination metadata object
 * @return {Object}                 action object
 */
export const setPagination = paginationData => ({
  type: actionTypes.SET_LIBRARY_PAGINATION,
  pagination: paginationData
});


/**
 * @param  {Bool} status
 * @return {Object}      action object
 */
const fetchingBooks = status => ({
  type: actionTypes.FETCHING_MORE_BOOKS,
  status,
});


/**
 * fetch books in the Library
 * @param {object} options
 * @return {Promise}   dispatches an action
 */
export const fetchBooks = options => (dispatch) => {
  const query = queryStringFromObject(options);
  const bookAction = options && options.offset && options.offset > 0 ?
    getMoreBooks : getBooks;
  dispatch(fetchingBooks(true));
  return axios.get(`${API}/books${query}`)
    .then((response) => {
      dispatch(fetchingBooks(false));
      if (response.data.books.length) {
        dispatch(bookAction(response.data.books));
        dispatch(setPagination(response.data.metadata));
      } else {
        notify.error(response.data.message);
      }
    }, (error) => {
      dispatch(fetchingBooks(false));
      notify.error(error.response.data.message);
    })
    .catch((error) => {
      dispatch(fetchingBooks(false));
      notify.error(error);
    });
};


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
 * get book categories
 * @return {any} dispatches an action to the redux store
 */
export const getBookCategories = () => dispatch => (
  axios.get(`${API}/books/category`)
    .then(response => (
      dispatch(getBookCategoriesAction(response.data.categories))
    ), error => notify.error(error.response.data.message))
    .catch(error => notify.error(error))
);


export const filterBooksByCategory = categoryId => dispatch => (
  axios.get(`${API}/books?categoryId=${categoryId}`)
    .then(response => dispatch(getBooks(response.data.books)))
    .catch(error => notify.error(error.response.data.message))
);
