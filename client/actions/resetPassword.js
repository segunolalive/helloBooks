import axios from 'axios';
import API from './api';
import notify from './notify';

/**
* send request to reset password
* @param {String} password  new password
* @param {String} token     json web token
* @returns {Undefined}      sends an http request
*/
const resetPassword = (password, token) => () => (
  axios.put(`${API}/users/reset-password/${token}`, { password })
    .then(response => notify.success(response.data.message),
      error => notify.error(error.response.data.message)
    ).catch(err => notify.error(err.response.data.message))
);

export default resetPassword;
