/**
 * converts an array to Object with array items as keys and values
 *
 * @example ['books'] becomes { books: 'books' }
 *
 * @param  {Array|Object} keys  array of keys or object with required keys
 *
 * @returns {Object}      Object with keys and values mirrored
 */
const keyMirror = (keys) => {
  keys = Array.isArray(keys) ? keys : Object.keys(keys);
  const mirror = {};
  keys.forEach((key) => {
    mirror[key] = key;
    return mirror;
  });
  return mirror;
};

export default keyMirror;
