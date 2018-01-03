import axios from 'axios';
import actionTypes from '../actionTypes';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { authLoading } from './signup';
import API from '../api';
import Notify from '../Notify';
import reportNetworkError from '../reportNetworkError';


/**
 * Action creator that sets user data on login
 *
 * @param {Object} user - user data
 *
 * @returns {Object}    - Object containing action type and user
 */
export const loginUser = user => ({
  type: actionTypes.LOGIN,
  user,
});


/**
 * Action creator that sets login status
 *
 * @param {Boolean} status - status
 *
 * @returns {Object}       - Object containing action type and login status
 */
export const setLoginStatus = status => ({
  type: actionTypes.SET_LOGIN_STATUS,
  isLoggedIn: status,
});


/**
 * async action creator for user login
 *
 * @param {Object} data - user data
 *
 * @returns {Promise}   - resolves with user data and authorization token
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
      Notify.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      reportNetworkError(error);
      return dispatch(authLoading(false));
    });
};
