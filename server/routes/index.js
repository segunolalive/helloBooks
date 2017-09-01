import userController from '../controllers/users';
import bookController from '../controllers/books';

import authenticate from '../middleware/authentication';


export default (app) => {
  app.post('/api/v1/users/signup', userController.createUser);
  app.post('/api/v1/users/signin', userController.getUser);
  app.get('/api/v1/books/category', bookController.getBookCategories);
  app.get('/api/v1/books/:id', bookController.getBook);
  app.get('/api/v1/books', bookController.getAllBooks);
  app.post('/api/v1/books/category', authenticate, bookController.addCategory);
  app.post('/api/v1/books', authenticate, bookController.createBook);
  app.delete('/api/v1/books/:id', authenticate, bookController.deleteBook);
  app.put('/api/v1/books/:id', authenticate, bookController.editBookInfo);
  app.post('/api/v1/users/:id/books', authenticate, bookController.borrowBook);
  app.put('/api/v1/users/:id/books', authenticate, bookController.returnBook);
  app.get('/api/v1/users/:id/books', authenticate, userController.getBorrowedBooks);
  // Setup a default catch-all route that sends back a welcome message in JSON format.
  app.get('/api*', (req, res) => res.status(200).send({
    message: 'Seems like you might be lost.',
  }));
};
