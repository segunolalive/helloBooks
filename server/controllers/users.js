import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { User, Book } from '../models';
import { getJWT } from '../helpers/helpers';

dotenv.config();


export default {
  /**
   * Create new user account.
   * It sends a an object containing a success boolean
   * and a json web token or error
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {mixed}      - sends an http response
   */

  createUser(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    return User.find({
      where: { $or: [{ username }, { email }] }
    }).then((existingUser) => {
      if (existingUser && existingUser.username === username) {
        res.status(409).json({
          message: 'username is taken',
        });
        return;
      }
      if (existingUser && existingUser.email === email) {
        res.status(409).json({
          message: 'email is associated with an account',
        });
        return;
      }
      User.create(req.body)
        .then((user) => {
          const token = getJWT(
            user.id,
            user.email,
            user.username,
            user.isAdmin
          );
          const { id, firstName, lastName, isAdmin } = user;
          res.status(201).json({
            token, id, firstName, lastName, isAdmin
          });
        })
        .catch(error => res.status(400).send({
          error
        }));
    })
      .catch(error => res.status(500).send({
        error
      }));
  },

  /**
   * Edit user Information
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {mixed}      - sends an http response
   */
  updateUserInfo(req, res) {
    User.findById(req.user.id)
      .then((user) => {
        user.update(req.body, { returning: true, plain: true })
          .then(() => res.status(200).send({
            user,
            message: 'Your information was successfully updated',
          }), (error) => {
            res.status(500).send({
              error,
            });
          });
      })
      .catch(error => res.status(500).send({
        error,
      }));
  },

  /**
   * Get user data on sign in.
   * It sends a an object containing a success boolean
   * and a json web token or error
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {mixed}      - sends an http response
   */

  getUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    return User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        res.status(400).send({
          message: 'user does not exist',
        });
        return;
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.status(400).send({
            message: 'wrong username and password combination',
          });
        } else {
          const token = getJWT(
            user.id,
            user.email,
            user.username,
            user.isAdmin
          );
          const { id, firstName, lastName, isAdmin } = user;
          res.status(200).json({
            token, id, firstName, lastName, isAdmin
          });
        }
      }).catch(error => res.status(500).send({
        error,
      }));
    }).catch(error => res.status(400).send({
      error,
    }));
  },

  /**
   * Get list of books borrowed by specific user
   * It sends a an object containing a success boolean
   * and a data key, an array of borrowed books or an error
   * Response can be filtered by returned status
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {mixed}      - sends an http rresponse
   */
  getBorrowedBooks(req, res) {
    const id = req.params.id;
    User.findOne({
      where: { id },
      include: [{ model: Book }]
    }).then((user) => {
      let books;
      if (req.query && req.query.returned === 'false') {
        books = user.Books.filter(
          book => book.BorrowedBook.returned === false
        );
      } else if (req.query && req.query.returned === 'true') {
        books = user.Books.filter(
          book => book.BorrowedBook.returned === true
        );
      } else {
        books = user.Books;
      }
      res.status(200).send({
        data: books
      });
    })
      .catch(error => res.status(500).send({
        message: 'An error occured while fetching borrowing history',
        error,
      }));
  },
};
