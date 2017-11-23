export default (obj) => {
  let query = '?';
  if (obj) {
    const params = Object.keys(obj);
    params.forEach((param) => {
      query += `${param}=${obj[param]}&`;
    });
  }
  return query;
};
