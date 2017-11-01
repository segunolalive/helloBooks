import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { User, Book } from '../models';
import { getJWT } from '../helpers/helpers';
import { transporter, mailOptions } from '../config/mail';

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
   * @return {Object}     - returns an http response object
   */

  createUser(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    return User.find({
      where: { $or: [{ username }, { email }] }
    }).then((existingUser) => {
      if (existingUser && existingUser.username === username) {
        return res.status(409).json({
          message: 'username is taken',
        });
      }
      if (existingUser && existingUser.email === email) {
        return res.status(409).json({
          message: 'email is associated with an account',
        });
      }
      User.create(req.body)
        .then((user) => {
          const jwtOptions = {
            id: user.id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            membershipType: user.membershipType
          };
          const token = getJWT(jwtOptions);
          const { id, firstName, lastName, isAdmin } = user;
          return res.status(201).json({
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
   * @return {Object}     - returns an http response object
   */
  updateUserInfo(req, res) {
    return User.findById(req.user.id)
      .then((user) => {
        user.update(req.body, { returning: true, plain: true })
          .then(() => {
            const jwtOptions = {
              id: user.id,
              email: user.email,
              username: user.username,
              isAdmin: user.isAdmin,
              membershipType: user.membershipType
            };
            const token = getJWT(jwtOptions);
            const { id, firstName, lastName, isAdmin } = user;
            return res.status(200).json({
              token,
              id,
              firstName,
              lastName,
              isAdmin,
              message: 'Your information was successfully updated',
            });
          }, (error) => {
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
   * @return {Object}     - returns an http response object
   */

  getUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    return User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'user does not exist',
        });
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          return res.status(400).send({
            message: 'wrong username and password combination',
          });
        }
        const jwtOptions = {
          id: user.id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
          membershipType: user.membershipType
        };
        const token = getJWT(jwtOptions);
        const { id, firstName, lastName, isAdmin } = user;
        return res.status(200).json({
          token, id, firstName, lastName, isAdmin
        });
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
   * @return {Object}     - returns an http rresponse object
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
      return res.status(200).send({
        data: books
      });
    })
      .catch(error => res.status(500).send({
        message: 'An error occured while fetching borrowing history',
        error,
      }));
  },

  passwordResetMail(req, res) {
    return User.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'email'],
      plain: true,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Email does not match any account in our records',
          });
        }
        const BASE_URL = process.env.NODE_ENV === 'development' ?
          'http://localhost:8080' :
          'https://segunolalive-hellobooks.com';
        const token = getJWT({ id: user.id }, '1h');
        const to = user.email;
        const bcc = null;
        const subject = 'no-reply: Password reset link';
        const html = `<h3>Use this link to reset your password.</h3>
          ${BASE_URL}/reset-password?token=${token}}
          <p>This link is valid only for an hour</p>`;
        transporter.sendMail(mailOptions(to, bcc, subject, html),
          (err) => {
            if (err) {
              return res.status(500).send({
                message: 'An error occured while sending you a link. Try again',
              });
            }
            return res.status(200).send({
              message: 'An password reset link has been sent to your email',
            });
          });
      })
      .catch(() => (
        res.status(500).send({
          message: 'An error occured while sending you a link. Try again',
        })
      ));
  }
};
