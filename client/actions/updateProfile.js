import axios from 'axios';
import API from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { loginUser } from './login';
import notify from './notify';

/**
 * action creator for updating user information
 * @param  {Object} profile profile data
 * @return {Thunk}          function that dispatches an action
 */
export const updateProfile = profile => dispatch => (
  axios.put(`${API}/users`, profile)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      notify.success(response.data.message);
      return dispatch(loginUser(response.data));
    }, error => notify.error(error.response.data.message))
    .catch(error => notify.error(error))
);
