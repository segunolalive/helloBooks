import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';


/**
 * @param {Object} book - book
 * @returns {Object} - Object containing action type and book
 */
export const getBook = book => ({
  type: actionTypes.GET_BOOK,
  book,
});


/**
 * @param {Integer} id - book id
 * @returns {Object} - Object containing action type and book id
 */
export const setBookId = id => ({
  type: actionTypes.SET_BOOK_ID,
  id,
});


/**
 * get book Detail
 * @param  {Integer} id book Id
 * @return {any}    dispatches an action to the redux store
 */
export const viewBookDetails = id => dispatch => (
  axios.get(`${API}/books/${id}`)
    .then((response) => {
      dispatch(getBook(response.data.data));
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
    })
);
