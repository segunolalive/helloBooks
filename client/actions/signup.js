import axios from 'axios';
import actionTypes from '../actions/actionTypes';
import API from './api';
import { setLoginStatus } from './login';

/**
 * @param {any} user - user
 * @returns {Object} - Object containing action type and user
 */
export const signUpUser = (user => ({
  type: actionTypes.SIGN_UP,
  user,
}));


/**
 * @param {any} data - user data
 * @returns {any} - dispatches login user action
 */
export const signUp = data => dispatch => (
  axios.post(`${API}/users/signup`, data)
    .then((response) => {
      sessionStorage.setItem('token', response.data.token);
      dispatch(signUpUser(response.data));
      dispatch(setLoginStatus(true));
      return response.data;
    })
);
