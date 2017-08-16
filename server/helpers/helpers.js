import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return user;
};

export const getJWT = (id, email, username, isAdmin) =>
  jwt.sign({
    id,
    email,
    username,
    isAdmin,
  }, process.env.SECRET, {
    expiresIn: '24h',
  });
