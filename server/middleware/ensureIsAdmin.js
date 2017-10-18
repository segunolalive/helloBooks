/**
 * checks if user is admin
 * @param  {object}   req     HTTP request object
 * @param  {object}   res     HTTP response object
 * @param  {Function} next    calls the next middleware Function
 * @return {Function|Object}  calls next or returns a response
 */
const ensureIsAdmin = (req, res, next) => (
  req.user && req.user.isAdmin ?
    next() :
    res.status(401).send({
      message: 'Unauthorized access',
    })
);

export default ensureIsAdmin;
