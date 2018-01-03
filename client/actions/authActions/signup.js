import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import { setLoginStatus } from './login';
import Notify from '../Notify';
import reportNetworkError from '../reportNetworkError';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

/**
 * Action creator that sets user in state data on sign up
 *
 * @param {any} user - user
 *
 * @returns {Object} - Object containing action type and user
 */
export const signUpUser = (user => ({
  type: actionTypes.SIGN_UP,
  user,
}));

/**
 * Action creator that sets loading state
 *
 * @param {Bool} state - loading state
 *
 * @returns {Object}   - Object containing action type and loading state
 */
export const authLoading = (state => ({
  type: actionTypes.AUTH_LOADING,
  state,
}));


/**
 * async action creator for user sign up
 *
 * @param {any} data - user data
 *
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
      Notify.success(response.data.message);
      return response.data;
    })
    .catch((error) => {
      reportNetworkError(error);
      return dispatch(authLoading(false));
    });
};
