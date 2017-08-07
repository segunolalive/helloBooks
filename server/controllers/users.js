import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { User } from '../models';
import { getJWT, hashPassword } from '../helpers/helpers';

dotenv.config();


export default {
  createUser(req, res) {
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
  getUser(req, res) {
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
          const token = getJWT(user.id, user.username, user.email);
          res.status(200).send(token);
        }
      });
    });
  },
  borrowBook(req, res) {
    const userId = req.params.id;
    const bookId = req.body.id;
    res.send(userId);
  },
  returnBook(req, res) {
    const userId = req.params.id;
    const bookId = req.body.id;
    res.send(userId);
  },
  getProfile(req, res) {
    // const returned;
    const id = req.params.id;
    User.findAll({
      where: { id },
      include: [{
        model: 'Book', }]
    }).then(books => res.status(200).send(books));
  },
};
