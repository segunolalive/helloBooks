import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import API from './api';


/**
 * @param {Object} user - user data
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
 * @param {object} data - user data
 * @returns {any} - dispatches login user action
 */
export const login = data => dispatch => (
  axios.post(`${API}/users/signin`, data)
    .then((response) => {
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(loginUser(response.data));
      dispatch(setLoginStatus(true));
      return response.data;
    })
);
