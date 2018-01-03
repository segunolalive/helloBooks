import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import reportNetworkError from '../reportNetworkError';


/**
 * @param {Object} book - book
 *
 * @returns {Object}    - Object containing action type and book
 */
export const getBook = book => ({
  type: actionTypes.GET_BOOK,
  book,
});

/**
 * get book Detail
 *
 * @param  {Integer} id  book Id
 *
 * @return {Promise}     resolves with book information
 */
export const viewBookDetails = id => dispatch => (
  axios.get(`${API}/books/${id}`)
    .then(response => dispatch(getBook(response.data.book)))
    .catch(error => reportNetworkError(error))
);
