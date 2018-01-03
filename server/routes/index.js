import express from 'express';

import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';
import TransactionController from '../controllers/TransactionController';

import authenticate from '../middleware/authenticate';
import shouldBorrowBook from '../middleware/shouldBorrowBook';
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
    UserController.createUser
  )
  .post(
    '/users/signin',
    prepareGoogleAuth,
    validateInput.signin,
    UserController.getUser
  )
  .post('/users/forgot-password',
    validateInput.requestPasswordReset,
    UserController.passwordResetMail)
  .get('/books/category', BookController.getBookCategories)

  .get(
    '/books/suggestions',
    BookController.suggestedBooks
  )
  .get('/books/:id', validateInput.validateId, BookController.getBook)

  .get('/books', validateLimitAndOffset, BookController.getBooks)

  // Protected routes
  .put(
    '/users/reset-password/:token',
    authenticate,
    validateInput.updateUser,
    UserController.updateUserInfo
  )
  .put(
    '/users',
    authenticate,
    validateInput.updateUser,
    UserController.updateUserInfo
  )
  .post(
    '/users/:id/books',
    authenticate,
    validateInput.validateId,
    shouldBorrowBook,
    BookController.borrowBook
  )
  .put(
    '/users/:id/books',
    authenticate,
    validateInput.validateId,
    BookController.returnBook
  )
  .get(
    '/users/:id/books',
    authenticate,
    validateInput.validateId,
    UserController.getBorrowedBooks
  )
  .get(
    '/users/:id/transactions',
    authenticate,
    validateInput.validateId,
    (req, res, next) => TransactionController(req, res, next, { history: true })
  )
  .post(
    '/users/reset-password/:token',
    authenticate,
    UserController.updateUserInfo
  )

  // Admin-specific routes
  .post(
    '/books/category',
    authenticate,
    ensureIsAdmin,
    BookController.addCategory
  )
  .post(
    '/books',
    authenticate,
    ensureIsAdmin,
    validateInput.addBook,
    BookController.createBook
  )
  .delete(
    '/books/:id',
    authenticate,
    ensureIsAdmin,
    validateInput.validateId,
    BookController.deleteBook
  )
  .put(
    '/books/:id',
    authenticate,
    ensureIsAdmin,
    validateInput.validateId,
    validateInput.updateBook,
    BookController.editBookInfo
  )
  .get(
    '/admin-notifications',
    authenticate,
    ensureIsAdmin,
    (req, res, next) => TransactionController(req, res, next, { admin: true })
  )
  // Send a message if route does not exist
  .get('*', (req, res) => res.status(404).send({
    message: 'Seems like you might be lost',
  }));

export default router;
