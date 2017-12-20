import axios from 'axios';

/**
 * set or remove authorization token on request headers
 *
 * @param {String} token authorization
 *
 * @returns {Undefined} sets token on request header
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  }
};

export default setAuthorizationToken;
