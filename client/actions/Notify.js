import toastr from 'toastr';

toastr.options.preventDuplicates = true;
toastr.options.timeOut = 2500;

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
  toastr.error(message);
};


export default {
  success,
  error,
};
