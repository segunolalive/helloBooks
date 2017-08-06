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
    req.headers.Authorization;
  return token;
};


/**
* authenticates a json web token from the http request object
* @public
* @param {object} req - express http request object
* @param {object} res - express http response object
* @param {object} next - function that calls the next function
* in the middleware stack
* @return {object} return an http response or calls the next middleware
* function
*/
const authenticate = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'unauthorized accesss' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(400).send({
      success: false,
      message: 'No token provided',
    });
  }
};

export default authenticate;
