import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';
import { setLoginStatus } from './login';
import notify from './notify';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * @param {any} user - user
 * @returns {Object} - Object containing action type and user
 */
export const signUpUser = (user => ({
  type: actionTypes.SIGN_UP,
  user,
}));

/**
 * @param {Bool} state - loading state
 * @returns {Object}   - Object containing action type and loading state
 */
export const authLoading = (state => ({
  type: actionTypes.AUTH_LOADING,
  state,
}));


/**
 * @param {any} data - user data
 * @returns {any} - dispatches login user action
 */
export const signUp = data => (dispatch) => {
  dispatch(authLoading(true));
  return axios.post(`${API}/users/signup`, data)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(signUpUser(response.data));
      dispatch(setLoginStatus(true));
      dispatch(authLoading(false));
      notify.success(response.data.message);
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
