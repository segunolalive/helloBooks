import axios from 'axios';
import API from './api';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { loginUser } from './authActions/login';
import Notify from './Notify';
import reportNetworkError from './reportNetworkError';


/**
 * action creator for updating user information
 *
 * @param  {Object}  profile profile data
 *
 * @return {Promise}   resolves with updated user data
 */
const updateProfile = profile => dispatch => (
  axios.put(`${API}/users`, profile)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthorizationToken(token);
      Notify.success(response.data.message);
      return dispatch(loginUser(response.data));
    })
    .catch((error) => {
      reportNetworkError(error);
      return Promise.reject(error);
    })
);

export default updateProfile;
