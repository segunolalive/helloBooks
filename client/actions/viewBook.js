import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';


/**
 * @param {Object} book - book
 * @returns {Object} - Object containing action type and user
 */
export const getBook = book => ({
  type: actionTypes.GET_BOOK,
  book,
});


/**
 * het book Detail
 * @param  {Integer} id book Id
 * @return {any}    dispatches an action to the redux store
 */
export const viewBookDetails = id => dispatch => (
  axios.get(`${API}/books/${id}`)
    .then((response) => {
      dispatch(getBook(response.data.data));
    })
);
