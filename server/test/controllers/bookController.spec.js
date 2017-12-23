import supertest from 'supertest';
import { assert } from 'chai';
import sinon from 'sinon';
import app from '../../app';
import mock from '../mock';
import { Book, BorrowedBook } from '../../models';


const server = supertest.agent(app);
let jwtToken;

describe('Book Controller', () => {
  before((done) => {
    server
      .post('/api/v1/users/signin')
      .send(mock.adminUser)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });
  describe('#getBooks', () => {
    it('should be allow users to view all books', (done) => {
      server
        .get('/api/v1/books')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(Array.isArray(res.body.books));
          assert(res.body.books[0].title, 'eloquent javascript');
          assert(res.body.books[0].authors, 'marijn haverbeke');
          assert(res.body.books[0].total, 20);
          assert(res.body.books[0].categoryId, 1);
          done();
        });
    });
    it('should be allow users to view all books under a category', (done) => {
      server
        .get('/api/v1/books?categoryId=1')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(Array.isArray(res.body.books));
          assert(res.body.books[0].title, 'eloquent javascript');
          assert(res.body.books[0].authors, 'marijn haverbeke');
          assert(res.body.books[0].total, 20);
          assert(res.body.books[0].categoryId, 1);
          assert(res.body.books[1].title, 'eloquent ruby');
          assert(res.body.books[1].categoryId, 1);
          assert(res.body.books[1].title, 'eloquent fish');
          assert(res.body.books[2].categoryId, 1);
          done();
        });
    });
    it('should be allow users search for books', (done) => {
      server
        .get('/api/v1/books?search=fish')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(Array.isArray(res.body.books));
          assert(res.body.books[0].title, 'eloquent fish');
          assert(res.body.books[0].authors, 'flo harrison, dan fish');
          assert(res.body.books[0].description, 'feel the fish');
          assert(res.body.books[0].total, 10);
          assert(res.body.books[0].categoryId, 1);
          assert(res.body.metadata);
          assert(res.body.metadata.pageNumber, 1);
          assert(res.body.metadata.pageCount, 1);
          assert(res.body.metadata.total, 1);
          done();
        });
    });
    it('should return a message when search for books returns no match',
      (done) => {
        server
          .get('/api/v1/books?search=gibberish')
          .expect(200)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert(Array.isArray(res.body.books));
            assert.equal(res.body.books.length, 0);
            assert.equal(res.body.message, 'No book matched your request');
            done();
          });
      });
  });

  describe('#getBook', () => {
    it('should allow users to view a book\'s information', (done) => {
      server
        .get('/api/v1/books/1')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(res.body.book.title, 'eloquent javascript');
          assert(res.body.book.authors, 'marijn haverbeke');
          assert(res.body.book.total, 'a modern introduction to programming');
          assert(res.body.book.description, 20);
          assert(res.body.book.categoryId, 1);
          done();
        });
    });
    it('should send a 404 status if book is not found', (done) => {
      server
        .get('/api/v1/books/200')
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Book not found');
          done();
        });
    });
  });
  describe('#borrowBook', () => {
    it('should allow users borrow book', (done) => {
      server
        .post('/api/v1/users/1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ id: 4 })
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message,
            'You have successfully borrowed eloquent fish again. Check your dashboard to read it'
          );
          done();
        });
    });
    it('should allow users borrow book again after returning', (done) => {
      server
        .post('/api/v1/users/1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ id: 2 })
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message,
            'You have successfully borrowed eloquent ruby again. Check your dashboard to read it'
          );
          done();
        });
    });
    it('should send a 404 status code if book does not exist', (done) => {
      server
        .post('/api/v1/users/1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ id: 200 })
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Book not found');
          done();
        });
    });
    it('should send message if there are no available copies', (done) => {
      server
        .post('/api/v1/users/1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ id: 3 })
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(
            res.body.message,
            'There are no available copies of this book at this time');
          done();
        });
    });
    it('should prevent user from borrowing book multiple times unless previously returned',
      (done) => {
        server
          .post('/api/v1/users/1/books')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ id: 1 })
          .expect(200)
          .end((err, res) => {
            assert.equal(res.status, 403);
            assert.equal(res.body.message,
              'You currently have this book. Return it before trying to borrow it again',
            );
            done();
          });
      });
  });
  describe('#returnBook', () => {
    it('should allow logged in users return borrowed book', (done) => {
      server
        .put('/api/v1/users/1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ id: 1 })
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
    it('should send an error message if user tries to return a book they don\'t currently have', (done) => {
      server
        .put('/api/v1/users/1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ id: 1 })
        .expect(403)
        .end((err, res) => {
          assert.equal(res.status, 403);
          assert.equal(res.body.message, 'This book is currently not on your list. You have either returned it or never borrowed it');
          done();
        });
    });
  });
  describe('#editBookInfo', () => {
    it('should allow admin user modify book info', (done) => {
      server
        .put('/api/v1/books/1')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ title: 'Learn Rust' })
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.book.title, 'Learn Rust');
          assert.equal(res.body.book.authors, 'marijn haverbeke');
          done();
        });
    });
    it('should send a message if no update data is sent', (done) => {
      server
        .put('/api/v1/books/1')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({})
        .expect(400)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.book, undefined);
          assert.equal(res.body.message, 'Nothing to update');
          done();
        });
    });
    it('should send a 404 when attrempting to update a non-existent book book info',
      (done) => {
        server
          .put('/api/v1/books/1900000')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ title: 'Learn Rust' })
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.message, 'Book not found');
            done();
          });
      });
  });

  describe('#createBook', () => {
    it('should allow user add book to library', (done) => {
      server.post('/api/v1/books')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ ...mock.addBook })
        .expect(201)
        .end((err, res) => {
          assert.equal(res.status, 201);
          assert.equal(res.body.message,
            'Successfully added eloquent testing to Library');
          assert(res.body.book.title, 'eloquent testing');
          done();
        });
    });
  });

  describe('#deleteBook', () => {
    it('should allow user delete book', (done) => {
      server
        .delete('/api/v1/books/3')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message,
            'Successfully deleted book from database');
          server.get('/api/v1/books/3')
            .end((err, res) => {
              assert.equal(res.status, 404);
              assert.equal(res.body.message, 'Book not found');
            });
          done();
        });
    });
  });

  describe('#suggestedBooks', () => {
    it('should send an array of book suggestions', (done) => {
      server
        .get('/api/v1/books/suggestions')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(Array.isArray(res.body.suggestions));
          assert.containsAllKeys(res.body.suggestions[0],
            ['id', 'title', 'cover']);
          done();
        });
    });
  });

  describe('Book Category', () => {
    describe('#getBookCategories', () => {
      it('should return a list of book categories', (done) => {
        server
          .get('/api/v1/books/category')
          .expect(200)
          .end((err, res) => {
            const { categories } = res.body;
            assert.equal(res.status, 200);
            assert.equal(Array.isArray(categories), true);
            assert.equal(categories[0].id, 1);
            assert.equal(categories[0].category, 'javascript');
            assert.equal(categories[1].id, 2);
            assert.equal(categories[1].category, 'ruby');
            done();
          });
      });
    });
    describe('#addBookCategory', () => {
      before((done) => {
        server
          .post('/api/v1/users/signin')
          .send(mock.adminUser)
          .end((err, res) => {
            jwtToken = res.body.token;
            done();
          });
      });
      it('should allow adding of book category', (done) => {
        server
          .post('/api/v1/books/category')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ category: 'Rust' })
          .expect(201)
          .end((err, res) => {
            assert.equal(res.status, 201);
            assert.equal(res.body.message,
              'Successfully added new category, Rust, to Library');
            assert.equal(res.body.category.category, 'Rust');
            done();
          });
      });
    });
  });
});


describe('Book Server Errors', () => {
  before((done) => {
    server
      .post('/api/v1/users/signin')
      .send(mock.adminUser)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox = sandbox.restore();
  });
  describe('borrowBook', () => {
    it('should send a message if an error occurs while looking up the book',
      (done) => {
        const stub = sandbox.stub(BorrowedBook, 'findOne');
        stub.rejects();
        server
          .post('/api/v1/users/1/books')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ id: 1 })
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });
    it('should send a message if an error occurs while creating the record',
      (done) => {
        const stub = sandbox.stub(BorrowedBook, 'create');
        stub.rejects();
        server
          .post('/api/v1/users/1/books')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ id: 'invalid' })
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });
  });
  describe('deleteBook', () => {
    it('should send a message if an error occurs while deleting book',
      (done) => {
        const stub = sandbox.stub(Book, 'destroy');
        stub.rejects();
        server
          .delete('/api/v1/books/1')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ id: 4 })
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });
  });
  describe('createBook', () => {
    it('should send a message if an error occurs while adding book',
      (done) => {
        const stub = sandbox.stub(Book, 'create');
        stub.rejects();
        server.post('/api/v1/books')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ ...mock.addBook, title: 'failing' })
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });
  });
  describe('getBook', () => {
    it('should send a message if an error occurs while fetching book',
      (done) => {
        const stub = sandbox.stub(Book, 'findById');
        stub.rejects();
        server.get('/api/v1/books/1')
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });
  });
});
