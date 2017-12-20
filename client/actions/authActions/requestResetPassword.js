import axios from 'axios';
import API from '../api';
import notify from '../notify';
import reportNetworkError from '../reportNetworkError';


/**
 * send request to reset password
 * 
 * @param {String}    email  user email
 *
 * @returns {Promise}        resolves with a success notification
 */
const requestResetPassword = email => () => (
  axios.post(`${API}/users/forgot-password`, { email })
    .then(response => notify.success(response.data.message))
    .catch(error => reportNetworkError(error))
);

export default requestResetPassword;
