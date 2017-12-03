import express from 'express';


import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import transactionController from '../controllers/transactionController';

import authenticate from '../middleware/authenticate';
import shouldBorrow from '../middleware/maxBorrowed';
import ensureIsAdmin from '../middleware/ensureIsAdmin';
import validateInput from '../middleware/validateInput';
import prepareGoogleAuth from '../middleware/prepareGoogleAuth';
import validateLimitAndOffset from '../middleware/validateLimitAndOffset';


const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Hello Books API!'
}))
  // Unprotected routes
  .post(
    '/users/signup',
    prepareGoogleAuth,
    validateInput.signup,
    userController.createUser
  )
  .post(
    '/users/signin',
    prepareGoogleAuth,
    validateInput.signin,
    userController.getUser
  )
  .post('/users/forgot-password',
    validateInput.requestPasswordReset,
    userController.passwordResetMail)
  .get('/books/category', bookController.getBookCategories)
  .get('/books/:id', bookController.getBook)
  .get('/books', validateLimitAndOffset, bookController.getBooks)
  // Protected routes
  .put(
    '/users/reset-password/:token',
    authenticate,
    validateInput.updateUser,
    userController.updateUserInfo
  )
  .put(
    '/users',
    authenticate,
    validateInput.updateUser,
    userController.updateUserInfo
  )
  .post(
    '/users/:id/books',
    authenticate,
    shouldBorrow,
    bookController.borrowBook
  )
  .put(
    '/users/:id/books',
    authenticate,
    bookController.returnBook
  )
  .get(
    '/users/:id/books',
    authenticate,
    userController.getBorrowedBooks
  )
  .get(
    '/users/:id/transactions',
    authenticate,
    (req, res) => transactionController(req, res, { history: true })
  )
  .post(
    '/users/reset-password/:token',
    authenticate,
    userController.updateUserInfo
  )
  // Admin-specific routes
  .post(
    '/books/category',
    authenticate,
    ensureIsAdmin,
    bookController.addCategory
  )
  .post(
    '/books',
    authenticate,
    ensureIsAdmin,
    validateInput.addBook,
    bookController.createBook
  )
  .delete(
    '/books/:id',
    authenticate,
    ensureIsAdmin,
    bookController.deleteBook
  )
  .put(
    '/books/:id',
    authenticate,
    ensureIsAdmin,
    validateInput.updateBook,
    bookController.editBookInfo
  )
  .get(
    '/admin-notifications',
    authenticate,
    ensureIsAdmin,
    (req, res) => transactionController(req, res, { admin: true })
  )
  // Send a message if route does not exist
  .get('*', (req, res) => res.status(404).send({
    message: 'Seems like you might be lost',
  }));

export default router;
