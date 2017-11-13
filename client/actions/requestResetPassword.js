import axios from 'axios';
import API from './api';
import notify from './notify';

/**
 * send request to reset password
 * @param {String} email  user email
 * @returns {Undefined}   sends an http request
 */
const requestResetPassword = email => () => (
  axios.post(`${API}/users/forgot-password`, { email })
    .then(response => notify.success(response.data.message),
      error => notify.error(error.response.data.message)
    ).catch(err => notify.error(err.response.data.message))
);

export default requestResetPassword;
