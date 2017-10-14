const ensureIsAdmin = (req, res, next) => (
  req.user && req.user.isAdmin ?
    next() :
    res.status(401).send({
      success: false,
      message: 'Unauthorized access',
    })
);

export default ensureIsAdmin;
