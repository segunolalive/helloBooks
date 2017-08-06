import bcrypt from 'bcrypt';
import { User } from '../models';


const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return user;
};

export default {
  create(req, res) {
    return User.findOne({
      where: { username: req.body.username }
    }).then((existingUser) => {
      if (existingUser) {
        res.send('username is taken');
        return;
      }
      User.create(req.body)
        .then(user => hashPassword(user))
        .then(user => user.save())
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    });
  },
  find(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    return User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        res.send('user does not exist');
        return;
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.send('wrong username and password combination');
        } else {
          res.status(200).send(user);
        }
      });
    });
  },
};
