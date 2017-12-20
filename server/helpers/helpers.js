/**
 * Module dependencies
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Hashes the password of a given user
 *
 * @param  {Object} user object
 *
 * @return {Object} user object with hashed password
 */
export const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return user;
};

/**
 * signs a jsonwebtoken using credentials provided
 * 
 * @param  {Object} options           object of key values to sign jsonwebtoken
 * @param  {String} [expiresIn='24h'] expiration time
 *
 * @return {String}                   jsonwebtoken
 */
export const getJWT = (options, expiresIn = '24h') =>
  jwt.sign({ ...options }, process.env.SECRET, { expiresIn });
