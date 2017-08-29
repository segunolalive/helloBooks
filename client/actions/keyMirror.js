export default (keys) => {
  keys = Array.isArray(keys) ? keys : Object.keys(keys);
  const mirror = {};
  keys.forEach((key) => {
    mirror[key] = key;
    return mirror;
  });
  return mirror;
};
