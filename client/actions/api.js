let api = '/api/v1';

api = process.env.NODE_ENV === ('development' || 'test') ?
  `http://localhost:4000${api}` : api;

/**
 * api url
 *
 * @type {String}
 */
const API = api;

export default API;
