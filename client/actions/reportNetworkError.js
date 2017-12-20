import notify from './notify';

const reportNetworkError = error => (error.response ?
  notify.error(error.response.data.message) :
  notify.error(`${error.message}. It appears you're offline`));

export default reportNetworkError;
