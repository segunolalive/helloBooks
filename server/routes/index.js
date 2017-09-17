import express from 'express';

import userController from '../controllers/users';
import bookController from '../controllers/books';
import fetchAdminNotifications from '../controllers/fetchAdminNotifications';

import authenticate from '../middleware/authentication';
import shouldBorrow from '../middleware/maxBorrowed';
import ensureIsAdmin from '../middleware/ensureIsAdmin';


const router = express.Router();

router.get('/api/v1', (req, res) => res.status(200).send({
  message: 'Welcome to the Hello Books API!'
}))
  // Unprotected routes
  .post('/api/v1/users/signup', userController.createUser)
  .post('/api/v1/users/signin', userController.getUser)
  .get('/api/v1/books/category', bookController.getBookCategories)
  .get('/api/v1/books/:id', bookController.getBook)
  .get('/api/v1/books', bookController.getAllBooks)
  // Protected routes
  .put(
    '/api/v1/users',
    authenticate,
    userController.updateUserInfo
  )
  .post(
    '/api/v1/users/:id/books',
    authenticate,
    shouldBorrow,
    bookController.borrowBook
  )
  .put(
    '/api/v1/users/:id/books',
    authenticate,
    bookController.returnBook
  )
  .get(
    '/api/v1/users/:id/books',
    authenticate,
    userController.getBorrowedBooks
  )
  // Admin-specific routes
  .post(
    '/api/v1/books/category',
    authenticate,
    ensureIsAdmin,
    bookController.addCategory
  )
  .post(
    '/api/v1/books',
    authenticate,
    ensureIsAdmin,
    bookController.createBook
  )
  .delete(
    '/api/v1/books/:id',
    authenticate,
    ensureIsAdmin,
    bookController.deleteBook
  )
  .put(
    '/api/v1/books/:id',
    authenticate,
    ensureIsAdmin,
    bookController.editBookInfo
  )
  .get(
    '/api/v1/admin-notifications',
    authenticate,
    ensureIsAdmin,
    fetchAdminNotifications
  )
  // Send a message if route does not exist
  .get('/api*', (req, res) => res.status(404).send({
    message: 'Seems like you might be lost.',
  }));

export default router;
