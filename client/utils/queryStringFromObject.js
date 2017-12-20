/**
 * extracts query string from object
 *
 * @param {Object} obj
 *
 * @returns {String}  query string
 */
export default (obj) => {
  let query = '';
  if (obj) {
    query = '?';
    const params = Object.keys(obj);
    params.forEach((param) => {
      query += `${param}=${obj[param]}&`;
    });
  }
  return query;
};
