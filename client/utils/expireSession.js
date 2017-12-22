import axios from 'axios';
import store from '../store';
import logout from '../actions/authActions/logout';
import Notify from '../actions/Notify';

const expireSession = () =>
  axios.interceptors.response.use(response => response,
    (error) => {
      if (error.response && error.response.data.message ===
      'Your session has expired. Please reauthenticate') {
        store.dispatch(logout());
        Notify.error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );

export default expireSession;
