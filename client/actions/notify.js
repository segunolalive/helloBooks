const Materialize = window.Materialize;

const success = (message) => {
  Materialize.toast(message, 2500, 'teal darken-4');
};

const error = (message) => {
  Materialize.toast(message, 2500, 'red darken-4');
};


export default {
  success,
  error,
};
