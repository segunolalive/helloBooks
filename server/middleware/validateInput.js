import { check, validationResult } from 'express-validator/check';
import { sanitize } from 'express-validator/filter';
import bcrypt from 'bcrypt';

import { User } from '../models';
import { isReset } from './authenticate';

/**
 * deletes empty fields in object
 * @param  {Object} data
 * @return {Object}      Object with empty fields stripped out
 */
const deleteEmptyFields = (data) => {
  const fields = Object.keys(data);
  fields.forEach((field) => {
    if (!data[field]) delete data[field];
  });
  return data;
};

/**
 * trims string values in object
 * @param  {Object} data
 * @return {Object}      Object with strings trimmed
 */
const trimFields = (data) => {
  const fields = Object.keys(data);
  fields.forEach((field) => {
    if (typeof data[field] === 'string') {
      data[field] = data[field].trim();
    }
  });
  return data;
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


const unusedToken = (id, token) => {
  User.findById(id)
    .then(user => user.token === token);
};


export default {
  /**
   * validates fields on request to update user data
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   * @return {Object|Function} express http object or call next
   */
  updateUser(req, res, next) {
    trimFields(req.body);
    deleteEmptyFields(req.body);
    check(['firstName', 'lastName'], 'must contain alphabets only').isAlpha();
    sanitize(['firstName', 'lastName', 'password']).escape();
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
      if (unusedToken(req.user.id, req.params.token)) {
        return res.status(422).send({
          message: 'This link has been used already',
        });
      }
      next();
    } else {
      delete req.body.password;
      next();
    }
  },

  requestPasswordReset(req, res, next) {
    trimFields(req.body);
    deleteEmptyFields(req.body);
    if (!req.body.email) {
      return res.status(400).send({ message: 'Email cannot be empty' });
    }
    check('email', 'Provide a valid email').isEmail().normalizeEmail();
    next();
  }
};
