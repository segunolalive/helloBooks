const isEmpty = (item) => {
  if (!(typeof item === 'object')) {
    throw new TypeError('invalid arguement type. Provide array or object');
  }
  if (Array.isArray(item)) {
    return item.length === 0;
  }
  return Object.keys(item).length === 0;
};


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateSignUp = (state) => {
  const errors = {};
  if (!state.username.trim()) {
    errors.username = 'Username is required';
  } else if (state.username.charAt(0) === ' ') {
    errors.username = 'Username cannot begin with space characters';
  } else if (state.username.charAt(state.username.length - 1) === ' ') {
    errors.username = 'Username cannot end with space characters';
  }
  if (!emailRegex.test(state.email.trim())) {
    errors.email = 'Invalid email';
  } else if (!state.email.trim()) {
    errors.email = 'Email is required';
  }
  if (!state.password.trim()) {
    errors.password = 'Password is required';
  }
  if (!state.confirmPassword.trim()) {
    errors.confrimPassword = 'Password confirmation is required';
  } else if (!(state.password === state.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};


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
