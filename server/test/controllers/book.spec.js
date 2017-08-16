import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../app';
import models from '../../models/index';
import mock from '../mock/mock';


const server = supertest.agent(app);
let jwtToken;

describe('Book', () => {
  before(function (done) { // eslint-disable-line
    this.timeout(5000);
    server
      .post('/api/v1/users/signin')
      .send(mock.adminUser)
      .end((err, res) => {
        if (!err) {
          jwtToken = res.body.token;
        }
        done();
      });
  });
  describe('getAllBooks', () => {
    it('should be allow users to view all books', (done) => {
      server
        .get('/api/v1/books')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
  describe('getBook', () => {
    it('should allow users to view a book\'s information', (done) => {
      server
        .get('/api/v1/books/1')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
    it('should send a 404 status if book is not found', (done) => {
      server
        .get('/api/v1/books/200')
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          done();
        });
    });
  });
  describe('borrowBook', () => {
    it('should send a 404 status code if book does not exist', (done) => {
      server
        .post('/api/v1/users/1/books?id=200')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Book not found');
          done();
        });
    });
    it('should send message if there are no available copies', (done) => {
      server
        .post('/api/v1/users/1/books?id=3')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(404)
        .end((err, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'There are no available copies of this book at this time');
          done();
        });
    });
    it('should prevent user from borrowing book multiple times unless previously returned',
      (done) => {
        server
          .post('/api/v1/users/1/books?id=1')
          .set('X-ACCESS-TOKEN', jwtToken)
          .expect(200)
          .end((err, res) => {
            assert.equal(res.status, 403);
            assert.equal(res.body.message,
              'You currently have this book. Return it before trying to borrow it again'
            );
            done();
          });
      });
  });
  describe('returnBook', () => {
    it('should allow logged in users return borrowed book', (done) => {
      server
        .put('/api/v1/users/1/books?id=1')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 201);
          done();
        });
    });
    it('should allow logged in users borrow book', (done) => {
      server
        .post('/api/v1/users/1/books?id=1')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
  describe('editBookInfo', () => {
    it('should allow admin user modify book info', (done) => {
      server
        .put('/api/v1/books/1')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ title: 'Learn Rust' })
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.data[1].title, 'Learn Rust');
          done();
        });
    });
  });
});

describe('editBookInfo', () => {
  before(function (done) { // eslint-disable-line
    this.timeout(5000);
    server
      .post('/api/v1/users/signup')
      .send(mock.newUser)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });
  it('should prevent non-admin users from modifying book info', (done) => {
    server
      .put('/api/v1/books/1')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ title: 'Learn Rust' })
      .expect(401)
      .end((err, res) => {
        assert.equal(res.status, 401);
        done();
      });
  });
});
