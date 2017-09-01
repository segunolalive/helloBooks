import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';

/**
 * @param {any} user - user
 * @returns {Object} - Object containing action type and user
 */
export const loginUser = (user => ({
  type: actionTypes.LOGIN,
  user,
}));


/**
 * @param {any} data - user data
 * @returns {any} - dispatches login user action
 */
export const login = data => dispatch => (
  axios.post(`${API}/users/signin`, data)
    .then((response) => {
      sessionStorage.setItem('token', response.data.token);
      dispatch(loginUser(response.data));
    })
);
