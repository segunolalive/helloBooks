import Notify from './Notify';

const reportNetworkError = error => (error.response ?
  Notify.error(error.response.data.message) :
  Notify.error(`${error.message}. It appears you're offline`));

export default reportNetworkError;
