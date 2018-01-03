import axios from 'axios';

import actionTypes from '../actionTypes';
import API from '../api';
import Notify from '../Notify';
import reportNetworkError from '../reportNetworkError';
import queryStringFromObject from '../../utils/queryStringFromObject';


/**
 * action creator for getting books
 *
 * @param  {Array} books array of book objects
 *
 * @return {Object}       action object
 */
export const getBooks = books => ({
  type: actionTypes.GET_BOOKS,
  books,
});

/**
 * action creator for getting books
 *
 * @param  {Array} books array of book objects
 *
 * @return {Object}       action object
 */
export const getMoreBooks = books => ({
  type: actionTypes.GET_MORE_BOOKS,
  books,
});


/**
 * sets pagination metadata in store
 *
 * @param {Object}  paginationData  pagination metadata object
 *
 * @return {Object}                 action object
 */
export const setPagination = paginationData => ({
  type: actionTypes.SET_LIBRARY_PAGINATION,
  pagination: paginationData
});


/**
 * @param  {Bool} status
 *
 * @return {Object}      action object
 */
export const fetchingBooks = status => ({
  type: actionTypes.FETCHING_MORE_BOOKS,
  status,
});


/**
 * fetch books in the Library
 *
 * @param {Object} options
 *
 * @return {Promise}   resolves with array of books
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
        Notify.error(response.data.message);
      }
    })
    .catch((error) => {
      dispatch(fetchingBooks(false));
      reportNetworkError(error);
    });
};


/**
 * action creator for borrowing books
 *
 * @param  {Integer} id book id
 *
 * @return {Object}    action object
 */
export const borrowBookAction = id => ({
  type: actionTypes.BORROW_BOOK,
  id,
});


/**
 * sets quantity of selected book to zero
 *
 * @param  {Integer} id book id
 *
 * @return {Object}    action object
 */
export const setQuantityToZero = id => ({
  type: actionTypes.SET_BOOK_QUANTITY_TO_ZERO,
  id,
});


/**
 * send request to borrow a book from library
 *
 * @param  {integer} userId user id
 * @param  {integer} bookId book id
 *
 * @return {Promise}        resolves with success message
 */
export const borrowBook = (userId, bookId) => dispatch => (
  axios.post(`${API}/users/${userId}/books`, { id: bookId })
    .then((response) => {
      Notify.success(response.data.message);
      return dispatch(borrowBookAction(bookId));
    })
    .catch((error) => {
      reportNetworkError(error);
      if (error.response && error.response.data.message ===
        'There are no available copies of this book at this time') {
        return dispatch(setQuantityToZero(bookId));
      }
    })
);


/**
 * @param  {Array} categories book categories
 * @return {Object}           dispatches an action to store
 */
export const getBookCategoriesAction = categories => ({
  type: actionTypes.GET_BOOK_CATEGORIES,
  categories,
});

/**
 * get book categories
 *
 * @return {Promise} resolves with a list of book caategories
 */
export const getBookCategories = () => dispatch => (
  axios.get(`${API}/books/category`)
    .then(response => (
      dispatch(getBookCategoriesAction(response.data.categories))
    ))
    .catch(error => reportNetworkError(error))
);


export const filterBooksByCategory = categoryId => dispatch => (
  axios.get(`${API}/books?categoryId=${categoryId}`)
    .then(response => dispatch(getBooks(response.data.books)))
    .catch(error => reportNetworkError(error))
);
