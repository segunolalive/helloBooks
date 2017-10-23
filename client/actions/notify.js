import logout from './logout';

const Materialize = window.Materialize;

const success = (message) => {
  Materialize.toast(message, 2500, 'teal darken-4');
};

const error = (message) => {
  if (message === 'Your session has expired. Please reauthenticate') {
    logout();
  }
  Materialize.toast(message, 2500, 'red darken-4');
};


export default {
  success,
  error,
};
