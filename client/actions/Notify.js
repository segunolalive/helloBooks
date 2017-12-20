const Materialize = window.Materialize;

/**
 * Materialize.toast() wrapper for success notifications
 *
 * @param {String} message
 *
 * @returns {undefined} toasts a success message
 */
const success = (message) => {
  Materialize.toast(message, 2500, 'teal darken-4');
};

/**
 * Materialize.toast() wrapper for error notifications
 *
 * @param {String} message
 *
 * @returns {undefined} toasts an error message
 */
const error = (message) => {
  Materialize.toast(message, 2500, 'red darken-4');
};


export default {
  success,
  error,
};
