import userController from '../controllers/users';
import bookController from '../controllers/books';

import authenticate from '../middleware/authentication';


export default (app) => {
  app.post('/api/v1/users/signup', userController.createUser);
  app.post('/api/v1/users/signin', userController.getUser);
  app.get('/api/v1/books', bookController.getAllBooks);
  app.get('/api/v1/books/:id', bookController.getBook);
  app.use(authenticate);
  app.post('/api/v1/books', bookController.createBook);
  app.put('/api/v1/books/:id', bookController.editBookInfo);
  // app.post('/api/v1/users/:id/books', userController.borrowBook);
  // app.put('/api/v1/users/:id/books', userController.returnBook);
  app.get('/api/v1/users/:id/books', userController.getProfile);
};
