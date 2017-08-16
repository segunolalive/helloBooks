import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../app';
import '../../models/index';
import mock from '../mock/mock';


const server = supertest.agent(app);
let jwtToken;

describe('User', () => {
  it('should be able to sign up', (done) => {
    server
      .post('/api/v1/users/signup')
      .send(mock.newUser)
      .expect(201)
      .end((err, res) => {
        if (!err) {
          assert.equal(res.status, 201);
          assert.isNotNull(res.body.token);
        }
        done();
      });
  });
  it('should be able to sign in', (done) => {
    server
      .post('/api/v1/users/signin')
      .send(mock.adminUser)
      .expect(200)
      .end((err, res) => {
        if (!err) {
          assert.equal(res.status, 200);
          assert.isNotNull(res.body.token);
        }
        done();
      });
  });
  it('should respond with a message when trying to signup with existing email',
    (done) => {
      server
        .post('/api/v1/users/signup')
        .send(mock.existingEmail)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.message, 'email is associated with an account');
          done();
        });
    });
  it('should respond with a message when trying to signup with existing username',
    (done) => {
      server
        .post('/api/v1/users/signup')
        .send(mock.existingUsername)
        .end((err, res) => {
          assert.equal(res.status, 409);
          assert.equal(res.body.message, 'username is taken');
          done();
        });
    });
  it('should respond with a message when trying to sign in with nonexistent username',
    (done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.nonExistentUsername)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'user does not exist');
          done();
        });
    });
  it('should respond with a message when trying to sign in with wrong password',
    (done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.wrongPassword)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'wrong username and password combination');
          done();
        });
    });
  describe('getBorrowedBooks', () => {
    before((done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.adminUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });
    it('should allow a logged in user view books they have borrowed',
      (done) => {
        server
          .get('/api/v1/users/1/books')
          .set('X-ACCESS-TOKEN', jwtToken)
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });
  });
});
