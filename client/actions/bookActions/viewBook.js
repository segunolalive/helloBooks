import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';


/**
 * @param {Object} book - book
 * @returns {Object} - Object containing action type and book
 */
export const getBook = book => ({
  type: actionTypes.GET_BOOK,
  book,
});

/**
 * get book Detail
 * @param  {Integer} id book Id
 * @return {any}    dispatches an action to the redux store
 */
export const viewBookDetails = id => dispatch => (
  axios.get(`${API}/books/${id}`)
    .then(response => dispatch(getBook(response.data.book)))
    .catch(error => notify.error(error.response.data.message))
);
