import axios from 'axios';
import API from './api';

const Materialize = window.Materialize;

/**
* send request to reset password
* @param {String} password  new password
* @param {String} token     json web token
* @returns {Undefined}      sends an http request
*/
const resetPassword = (password, token) => () => (
  axios.put(`${API}/users/reset-password/${token}`, { password })
    .then(
      response =>
        Materialize.toast(response.data.message, 2500, 'teal darken-4'),
      error =>
        Materialize.toast(error.response.data.message, 2500, 'red darken-4')
    ).catch(err =>
      Materialize.toast(err.response.data.message, 2500, 'red darken-4')
    )
);

export default resetPassword;
