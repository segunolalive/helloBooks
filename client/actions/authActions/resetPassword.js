import axios from 'axios';
import API from '../api';
import Notify from '../Notify';
import reportNetworkError from '../reportNetworkError';

/**
* send request to reset password
*
* @param {String} password  new password
*
* @param {String} token     json web token
*
* @returns {Promise}        resolves with success notification
*/
const resetPassword = (password, token) => () =>
  axios
    .put(`${API}/users/reset-password/${token}`, { password })
    .then(response => Notify.success(response.data.message))
    .catch(error => reportNetworkError(error));
export default resetPassword;
