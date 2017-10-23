let api = '/api/v1';

if (process.env.NODE_ENV === ('development' || 'test')) {
  api = 'http://localhost:4000/api/v1';
}

/**
 * api url
 * @type {String}
 */
const API = api;

export default API;
