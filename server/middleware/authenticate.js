import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
* fetches json web token from request
* @private
* @param {Object} req - express http request object
* @return {String}      json web token
*/
const getToken = (req) => {
  const token = req.body.token || req.headers['x-access-token'] ||
    (req.headers.Authorization && req.headers.Authorization.slice(7)) ||
    req.params.token;
  return token;
};

/**
 * checks if it is a password reset
 * @param {Object} req http request object
 * @returns {Boolean}  true for password reset. False otherwise.
 */
export const isReset = req => (
  req.url.match('reset-password') && getToken(req) === req.params.token
);


/**
* authenticates a json web token from the http request object
* @public
* @param {Object} req - express http request object
* @param {Object} res - express http response object
* @param {Function} next - function that calls the next function
* in the middleware stack
* @return {mixed} sends an http response or calls the next middleware function
*/
const authenticate = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          if (isReset(req)) {
            return res.status(401).json({
              message: 'Your link has expired. Please get a new link'
            });
          }
          return res.status(401).json({
            message: 'Your session has expired. Please reauthenticate'
          });
        }
        return res.status(401).json({
          message: 'unauthorized accesss. Login to continue'
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      message: 'Login to proceed',
    });
  }
};

export default authenticate;
