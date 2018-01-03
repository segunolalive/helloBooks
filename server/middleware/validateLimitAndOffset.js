/**
   * validates limits and offset
   *
   * @param  {Object}   req    express http object
   * @param  {Object}   res    express http object
   * @param  {Function} next   calls the next middleware function
   *
   * @return {Object}          express http object or call next
*/
const validateLimitAndOffset = (req, res, next) => {
  if (req.query.limit && !Number.isInteger(Number(req.query.limit))) {
    return res.status(400).send({
      message: 'Please set the limit as an integer'
    });
  }
  if (req.query.offset && !Number.isInteger(Number(req.query.offset))) {
    return res.status(400).send({
      message: 'Please set the offset as an integer'
    });
  }
  next();
};

export default validateLimitAndOffset;
