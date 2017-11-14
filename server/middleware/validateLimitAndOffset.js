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
