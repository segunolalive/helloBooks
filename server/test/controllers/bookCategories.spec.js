import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../app';
import mock from '../mock/mock';


const server = supertest.agent(app);
let jwtToken;

describe('BookCategory', () => {
  describe('getBookCategories', () => {
    it('should return a list of book categories', (done) => {
      server
        .get('/api/v1/books/category')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
  describe('addBookCategory', () => {
    it('should prevent logged out users from adding book categories', (done) => {
      server
        .post('/api/v1/books/category')
        .send({ category: 'Romance' })
        .expect(401)
        .end((err, res) => {
          assert.equal(res.status, 401);
          done();
        });
    });
    describe('addBookCategory', () => {
      before((done) => {
        server
          .post('/api/v1/users/signup')
          .send(mock.newUserBookCategory)
          .end((err, res) => {
            jwtToken = res.body.token;
            console.log(jwtToken);
            done();
          });
      });
      it('should prevent non-admin users from adding book category', (done) => {
        server
          .post('/api/v1/books/category')
          .set('X-ACCESS-TOKEN', jwtToken)
          .send({ category: 'Romance' })
          .expect(401)
          .end((err, res) => {
            assert.equal(res.status, 401);
            done();
          });
      });
    });
  });
  describe('addBookCategory', () => {
    before((done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.adminUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });
    it('should allow admin users add book category', (done) => {
      server
        .post('/api/v1/books/category')
        .set('X-ACCESS-TOKEN', jwtToken)
        .send({ category: 'Rust' })
        .expect(201)
        .end((err, res) => {
          assert.equal(res.status, 201);
          done();
        });
    });
  });
});
