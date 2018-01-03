/**
 * tells if an object or array is empty
 *
 * @param {Object|Array} item
 *
 * @returns {boolean}       boolean
 */
export const isEmpty = (item) => {
  if (!(typeof item === 'object')) {
    throw new TypeError('invalid arguement type. Provide array or object');
  }
  if (Array.isArray(item)) {
    return item.length === 0;
  }
  return Object.keys(item).length === 0;
};


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|z(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]),|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * validates sign up
 *
 * @param {Object} state
 *
 * @returns {Object}     object containing validity status
 */
export const validateSignUp = (state) => {
  const errors = {};
  if (state.username.charAt(0) === ' ') {
    errors.username = 'Username cannot begin with space characters';
  } else if (state.username.charAt(state.username.length - 1) === ' ') {
    errors.username = 'Username cannot end with space characters';
  } else if (!state.username.trim()) {
    errors.username = 'Username is required';
  }
  if (!state.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(state.email.trim())) {
    errors.email = 'Invalid email';
  }
  if (!state.password.trim()) {
    errors.password = 'Password is required';
  }
  if (!state.confirmPassword.trim()) {
    errors.confirmPassword = 'Password confirmation is required';
  } else if (!(state.password === state.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};


/**
 * validates login
 *
 * @param {Object} state
 *
 * @returns {Object}     object containing validity status
 */
export const validateLogin = (state) => {
  const errors = {};
  if (!state.username.trim()) {
    errors.username = 'Username is required';
  }
  if (!state.password.trim()) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateForgotPassword = (state) => {
  const errors = {};
  if (!state.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(state.email.trim())) {
    errors.email = 'Invalid email';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
