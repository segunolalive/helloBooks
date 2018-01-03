import { isEmpty, validateSignUp, validateLogin, validateForgotPassword }
  from '../../../utils/validation/auth';

describe('auth', () => {
  describe('isEmpty', () => {
    it('returns true if passed an empty array or object', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('returns false if passed a non-empty array or object', () => {
      expect(isEmpty([1, 2])).toBe(false);
      expect(isEmpty({ a: 'a' })).toBe(false);
    });

    it('throws a Type Error if argument is not of type, object', () => {
      expect(() => isEmpty('sring')).toThrow();
    });
  });


  describe('validateSignup', () => {
    const userData = {
      email: 'smh@to',
      password: 'asdf',
      confirmPassword: 'asdnjhjgh',
      username: ' seni'
    };
    it('it validates user email', () => {
      expect(validateSignUp(userData).errors.email).toBe('Invalid email');
    });
    it('it checks if user email is empty', () => {
      const emptyEmail = { ...userData, email: '' };
      expect(validateSignUp(emptyEmail).errors.email).toBe('Email is required');
    });
    it('it checks if user password is empty', () => {
      const emptyPassword = { ...userData, password: '' };
      expect(validateSignUp(emptyPassword).errors.password)
        .toBe('Password is required');
    });
    it('checks if passwords confirmation was provided', () => {
      const noConfirmation = { ...userData, confirmPassword: '' };
      expect(validateSignUp(noConfirmation).errors.confirmPassword)
        .toBe('Password confirmation is required');
    });
    it('checks if passwords match', () => {
      expect(validateSignUp(userData).errors.confirmPassword)
        .toBe('Passwords do not match');
    });
    it('checks for leading spaces in username', () => {
      expect(validateSignUp(userData).errors.username)
        .toBe('Username cannot begin with space characters');
    });
    it('checks for trailing spaces in username', () => {
      const trailingSpace = { ...userData, username: 'seni   ' };
      expect(validateSignUp(trailingSpace).errors.username)
        .toBe('Username cannot end with space characters');
    });
    it('checks if username was provided', () => {
      const noUsername = { ...userData, username: '' };
      expect(validateSignUp(noUsername).errors.username)
        .toBe('Username is required');
    });
  });

  describe('validateLogin', () => {
    const userData = {
      password: '',
      username: ''
    };
    it('checks if login credentials were  provided', () => {
      expect(validateLogin(userData).errors.username)
        .toBe('Username is required');
      expect(validateLogin(userData).errors.password)
        .toBe('Password is required');
    });
  });

  describe('validateForgotPassword', () => {
    it('checks if email  provided is valid', () => {
      const state = { email: '123@i.u' };
      expect(validateForgotPassword(state).errors.email)
        .toBe('Invalid email');
    });
  });
});

