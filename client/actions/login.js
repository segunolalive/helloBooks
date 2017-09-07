import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';


/**
 * @param {any} user - user
 * @returns {Object} - Object containing action type and user
 */
export const loginUser = user => ({
  type: actionTypes.LOGIN,
  user,
});


/**
 * @param {Boolean} status - status
 * @returns {Object} - Object containing action type and login status
 */
export const setLoginStatus = status => ({
  type: actionTypes.SET_LOGIN_STATUS,
  isLoggedIn: status,
});


/**
 * @param {any} data - user data
 * @returns {any} - dispatches login user action
 */
export const login = data => dispatch => (
  axios.post(`${API}/users/signin`, data)
    .then((response) => {
      sessionStorage.setItem('token', response.data.token);
      dispatch(loginUser(response.data));
      dispatch(setLoginStatus(true));
    })
);
