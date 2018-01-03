import deepClone from 'deepclonejs';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { isReset } from './authenticate';

/**
 * deletes empty fields in object
 * @param  {Object} object
 * @return {Object}      Object with empty fields stripped out
 */
const deleteEmptyFields = (object) => {
  const clonedObject = deepClone(object);
  const fields = Object.keys(clonedObject);
  fields.forEach((field) => {
    if (clonedObject[field] === (null || undefined || '')) {
      delete clonedObject[field];
    }
  });
  return clonedObject;
};

/**
 * trims string values in object
 * @param  {Object} object
 * @return {Object}      Object with strings trimmed
 */
const trimFields = (object) => {
  const clonedObject = deepClone(object);
  const fields = Object.keys(clonedObject);
  fields.forEach((field) => {
    if (typeof clonedObject[field] === 'string') {
      clonedObject[field] = clonedObject[field].trim();
    }
  });
  return clonedObject;
};

/**
 * checks if password matches that associated with user
 * @param  {Integer} id       user id
 * @param  {String} password  password supplied
 * @return {Promise}          Promise which resolve to Boolean type
 */
const passwordIsCorrect = (id, password) => (
  User.findById(id)
    .then(user => (bcrypt.compare(password, user.password)))
);


/**
 * checks if Password reset token has been unusedToken
 * @param  {Integer} id    user id
 * @param  {String} token  password reset unusedToken
 * @return {Boolean}       true if token matches stored token
 */
const unusedToken = (id, token) =>
  User.findById(id)
    .then(user => user.passwordResetToken === token);


/**
 * input validation middleware
 */
export default {
  /**
   * validates fields on request to update user data
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  updateUser(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    delete req.body.id;
    delete req.body.isAdmin;
    delete req.body.username;
    if (req.body.password && req.body.newPassword) {
      passwordIsCorrect(req.user.id, req.body.password)
        .then((correct) => {
          if (!correct) {
            return res.status(422).send({
              message: 'Wrong password provided',
            });
          }
          req.body.password = req.body.newPassword;
          next();
        }).catch(() => res.status(500).send({
          message: 'an error occured while trying to update your information'
        }));
    } else if (isReset(req)) {
      unusedToken(req.user.id, req.params.token)
        .then((tokenStatus) => {
          if (!tokenStatus) {
            return res.status(422).send({
              message: 'This link has been used already',
            });
          }
          next();
        });
    } else {
      delete req.body.password;
      next();
    }
  },

  /**
   * validates fields on request to signup user
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  signup(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    delete req.body.id;
    delete req.body.isAdmin;
    req.body.username = req.body.username && req.body.username.toLowerCase();
    const { username, password, email, confirmPassword } = req.body;
    if (!username || typeof username !== 'string') {
      return res.status(400).send({
        message: 'Username is required'
      });
    } else if (!password || typeof password !== 'string') {
      return res.status(400).send({
        message: 'Password is required'
      });
    } else if (!email) {
      return res.status(400).send({
        message: 'Email is required'
      });
    } else if (!emailRegex.test(email)) {
      return res.status(400).send({
        message: 'Invalid Email'
      });
    } else if (
      !(password === confirmPassword)
    ) {
      return res.status(400).send({
        message: 'Passwords do not match'
      });
    }
    next();
  },

  /**
   * validates fields on signin request
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  signin(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    req.body.username = req.body.username && req.body.username.toLowerCase();
    const { username, password } = req.body;
    if (!username || typeof username !== 'string') {
      return res.status(400).send({
        message: 'Username is required'
      });
    } else if (!password || typeof password !== 'string') {
      return res.status(400).send({
        message: 'Password is required'
      });
    }
    next();
  },

  /**
   * validates fields on requestPasswordReset
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  requestPasswordReset(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    if (!req.body.email) {
      return res.status(400).send({ message: 'Email cannot be empty' });
    }
    next();
  },

  /**
   * validates fields on addBook
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  addBook(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    req.body.categoryId = (!Number.isNaN(req.body.categoryId) &&
      Number.isInteger(Number(req.body.categoryId)) &&
      Number(req.body.categoryId)) || undefined;
    next();
  },

  /**
   * validates fields on updateBook
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  updateBook(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    if (!Object.keys(req.body).length) {
      return res.status(400).send({ message: 'Nothing to update' });
    }
    next();
  },

  /**
   * validates id params
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  validateId(req, res, next) {
    if (req.body.id && !Number.isInteger(Number(req.body.id))) {
      return res.status(400).send({
        message: 'Id must be an integer'
      });
    }
    if (req.params.id && !Number.isInteger(Number(req.params.id))) {
      return res.status(400).send({
        message: 'Id must be an integer'
      });
    }
    next();
  }
};
