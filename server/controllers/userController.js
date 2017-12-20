import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { User, Book } from '../models';
import { getJWT } from '../helpers/helpers';
import { transporter, mailOptions } from '../config/mail';

dotenv.config();


const userController = {
  /**
   * Create new user account.
   * It sends an object containing a success boolean
   * and a json web token or error
   *
   * @public
   * 
   * @method
   * 
   * @param  {object}   req  - express http request object
   * @param  {object}   res  - express http response object
   * @param  {Function} next - calls the next middleware in the stack
   *
   * @return {Object}        - returns an http response object
   */

  createUser(req, res, next) {
    delete req.body.isAdmin;
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
          const {
            id,
            isAdmin,
            membershipType,
          } = user;
          const jwtOptions = { id, email, username, isAdmin, membershipType };
          const token = getJWT(jwtOptions);
          const { firstName, lastName } = user;
          return res.status(201).json({
            token,
            id,
            firstName,
            lastName,
            isAdmin,
            message: `Welcome ${firstName}. This is your dashboard`,
          });
        })
        .catch(error => next(error));
    })
      .catch(error => next(error));
  },

  /**
   * Edit user Information
   *
   * @public
   *
   * @method
   *
   * @param  {object}   req  - express http request object
   * @param  {object}   res  - express http response object
   * @param  {Function} next - calls the next middleware in the stack
   *
   * @return {Object}        - returns an http response object
   */
  updateUserInfo(req, res, next) {
    delete req.body.isAdmin;
    req.body.passwordResetToken = null;
    return User.findById(req.user.id)
      .then((user) => {
        user.update(req.body, { returning: true, plain: true })
          .then(() => {
            const {
              id,
              email,
              username,
              isAdmin,
              membershipType,
            } = user;
            const jwtOptions = { id, email, username, isAdmin, membershipType };
            const token = getJWT(jwtOptions);
            const { firstName, lastName } = user;
            return res.status(200).json({
              token,
              id,
              firstName,
              lastName,
              isAdmin,
              message: 'Your information was successfully updated',
            });
          })
          .catch(error => next(error));
      })
      .catch(error => next(error));
  },

  /**
   * Get user data on sign in.
   * It sends a an object containing a success boolean
   * and a json web token or error
   *
   * @public
   *
   * @method
   *
   * @param  {object}   req  - express http request object
   * @param  {object}   res  - express http response object
   * @param  {Function} next - calls the next middleware in the stack
   *
   * @return {Object}        - returns an http response object
   */

  getUser(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    return User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        if (req.body.authId) {
          return userController.createUser(req, res);
        }
        return res.status(403).send({
          message: 'user does not exist',
        });
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          return res.status(403).send({
            message: 'wrong username and password combination',
          });
        }
        const {
          id,
          email,
          isAdmin,
          membershipType,
        } = user;
        const jwtOptions = { id, email, username, isAdmin, membershipType };
        const token = getJWT(jwtOptions);
        const { firstName, lastName } = user;
        return res.status(200).json({
          token,
          id,
          firstName,
          lastName,
          isAdmin,
          message: `Welcome back ${firstName}`,
        });
      }).catch(error => next(error));
    }).catch(error => next(error));
  },

  /**
   * Get list of books borrowed by specific user
   * It sends a an object containing a success boolean
   * and a data key, an array of borrowed books or an error
   * Response can be filtered by returned status
   *
   * @public
   *
   * @method
   *
   * @param  {object}   req  - express http request object
   * @param  {object}   res  - express http response object
   * @param  {Function} next - calls the next middleware in the stack
   *
   * @return {Object}        - returns an http response object
   */
  getBorrowedBooks(req, res, next) {
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
        books
      });
    })
      .catch(error => next(error));
  },

  /**
  * sends a password reset email
  *
  * @public
  *
  * @method
  *
  * @param  {object}   req  - express http request object
  * @param  {object}   res  - express http response object
  * @param  {Function} next - calls the next middleware in the stack
  *
  * @return {Object}        - returns an http response object
  */
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
        user.passwordResetToken = token;
        user.save();
        const to = user.email;
        const bcc = null;
        const subject = 'no-reply: Password reset link';
        const html = `<h3>Use this link to reset your password.</h3>
          ${BASE_URL}/reset-password?token=${token}}
          <p>This link is valid only for an hour</p>`;
        transporter.sendMail(mailOptions(to, bcc, subject, html))
          .then(() => (
            res.status(200).send({
              message: 'A password reset link has been sent to your email',
            })
          ), () => (
            res.status(500).send({
              message: 'An error occured while sending you a link. Try again',
            })
          ));
      })
      .catch(() => (
        res.status(500).send({
          message: 'An error occured while sending you a link. Try again',
        })
      ));
  }
};


export default userController;
