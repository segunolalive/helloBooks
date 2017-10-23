import axios from 'axios';
import API from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { loginUser } from './login';

const Materialize = window.Materialize;

/**
 * action creator for updating user information
 * @param  {Object} profile profile data
 * @return {Thunk}          function that dispatches an action
 */
export const updateProfile = profile => (dispatch) => {
  axios.put(`${API}/users`, profile)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      dispatch(loginUser(response.data));
      Materialize.toast(
        response.data.message, 2500, 'teal darken-4'
      );
    }, (error) => {
      Materialize.toast(
        error.response.data.message,
        2500,
        'red darken 4'
      );
    })
    .catch((error) => {
      Materialize.toast(
        error,
        2500,
        'red darken 4'
      );
    });
};
