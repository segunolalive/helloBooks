import userController from '../controllers/users';
import bookController from '../controllers/books';

import authenticate from '../middleware/authentication';


export default (app) => {
  app.post('/api/v1/users/signup', userController.createUser);
  app.post('/api/v1/users/signin', userController.getUser);
  app.get('/api/v1/books/category', bookController.getBookCategories);
  app.get('/api/v1/books/:id', bookController.getBook);
  app.get('/api/v1/books', bookController.getAllBooks);
  app.use(authenticate);
  app.post('/api/v1/books/category', bookController.addCategory);
  app.post('/api/v1/books', bookController.createBook);
  app.delete('/api/v1/books/:id', bookController.deleteBook);
  app.put('/api/v1/books/:id', bookController.editBookInfo);
  app.post('/api/v1/users/:id/books', bookController.borrowBook);
  app.put('/api/v1/users/:id/books', bookController.returnBook);
  app.get('/api/v1/users/:id/books', userController.getBorrowedBooks);
};
