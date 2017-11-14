export default (req, res, next) => {
  if (req.body.googleId) {
    const authId = req.body.googleId;
    const {
      email,
      givenName: firstName,
      familyName: lastName,
    } = req.body;

    const username = email.slice(0, email.indexOf('@')) + authId;
    const password = authId;
    req.body = {
      email,
      username,
      password,
      lastName,
      firstName,
      authId,
    };
    return next();
  }
  next();
};
