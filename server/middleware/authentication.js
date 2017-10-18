import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
* fetches json web token from request
* @private
* @param {object} req - express http request object
* @return {string} json web token
*/
const getToken = (req) => {
  const token = req.body.token || req.headers['x-access-token'] ||
    req.headers.Authorization.slice(7);
  return token;
};


/**
* authenticates a json web token from the http request object
* @public
* @param {Object} req - express http request object
* @param {Object} res - express http response object
* @param {Function} next - function that calls the next function
* in the middleware stack
* @return {Undefined} sends an http response or calls the next middleware
* function
*/
const authenticate = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
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
    res.status(400).send({
      success: false,
      message: 'Login to proceed',
    });
  }
};

export default authenticate;
