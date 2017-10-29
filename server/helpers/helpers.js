/**
 * Module dependencies
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Hashes the password of a given user
 * @param  {Object} user object
 * @return {Object} user object with hashed password
 */
export const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return user;
};

/*
 * Signs a json web token with the supplied parameters
 * @param  {String}  - id
 * @param  {String}  - email
 * @param  {String}  - username
 * @param  {Boolean} - isAdmin
 * @return {String}
 */
export const getJWT = (options, expiresIn = '24h') =>
  jwt.sign({ ...options }, process.env.SECRET, { expiresIn });
