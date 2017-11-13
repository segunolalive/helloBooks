import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { authLoading } from './signup';
import API from './api';
import notify from './notify';


/**
 * @param {Object} user - user data
 * @returns {Object}    - Object containing action type and user
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
export const login = data => (dispatch) => {
  dispatch(authLoading(true));
  return axios.post(`${API}/users/signin`, data)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(loginUser(response.data));
      dispatch(setLoginStatus(true));
      dispatch(authLoading(false));
      notify.success(`Welcome back, ${response.data.firstName}`);
      return response.data;
    }, (error) => {
      notify.error(error.response.data.message);
      return dispatch(authLoading(false));
    })
    .catch(() => {
      notify.error('Something terrible happened. We\'ll fix that');
      return dispatch(authLoading(false));
    });
};
