import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { User, Book } from '../models';
import { getJWT, hashPassword } from '../helpers/helpers';

dotenv.config();


export default {
  createUser(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    return User.find({
      where: { $or: [{ username }, { email }] }
    }).then((existingUser) => {
      if (existingUser && existingUser.username === username) {
        res.status(400).json({
          success: false,
          message: 'username is taken',
        });
        return;
      }
      if (existingUser && existingUser.email === email) {
        res.status(400).json({
          success: false,
          message: 'email is associated with an account',
        });
        return;
      }
      User.create(req.body)
        .then(user => hashPassword(user))
        .then(user => user.save())
        .then(() => res.status(201).send({
          success: true,
          message: 'account created',
        }))
        .catch(error => res.status(400).send({
          success: false,
          error
        }));
    })
      .catch(error => res.status(500).send({
        success: false,
        error
      }));
  },
  getUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    return User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        res.staus(400).send({
          success: false,
          message: 'user does not exist',
        });
        return;
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.status(400).send({
            success: false,
            message: 'wrong username and password combination',
          });
        } else {
          const token = getJWT(user.id, user.username, user.email);
          res.status(200).json({ success: true, token });
        }
      });
    }).catch(error => res.status(400).send({
      success: false,
      error,
    }));
  },
  getProfile(req, res) {
    const id = req.params.id;
    User.findOne({
      where: { id },
      include: [{ model: Book }]
    }).then((user) => {
      const books = user.Books.filter(
        book => book.BorrowedBook.returned === true
      );
      res.status(200).send(books);
    })
      .catch(error => res.status(500).send({
        success: false,
        message: 'unable to fetch profile info',
        error,
      }));
  },
};
