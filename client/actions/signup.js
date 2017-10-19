import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';
import { setLoginStatus } from './login';

const Materialize = window.Materialize;

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
      localStorage.setItem('token', response.data.token);
      dispatch(signUpUser(response.data));
      dispatch(setLoginStatus(true));
      dispatch(authLoading(false));
      return response.data;
    }, (error) => {
      Materialize.toast(error.response.data.message, 2500, 'red darken-4');
      dispatch(authLoading(false));
    })
    .catch(() => {
      Materialize.toast(
        'Something terrible happened. We\'ll fix that',
        2500,
        'red darken-4'
      );
      dispatch(authLoading(false));
    });
};
