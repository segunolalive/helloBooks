import supertest from 'supertest';
import { assert } from 'chai';
import bcrypt from 'bcrypt';
import sinon from 'sinon';

import app from '../../app';
import { User } from '../../models/index';
import mock, { modelMock } from '../mock';
import { transporter } from '../../config/mail';


const server = supertest.agent(app);
let jwtToken;


describe('USER CONTROLLER', () => {
  it('should sign up user', (done) => {
    server
      .post('/api/v1/users/signup')
      .send({ ...mock.newUser })
      .expect(201)
      .end((err, res) => {
        console.log('===========\n\n', res.body, '\n\n==========');

        assert.equal(res.status, 201);
        assert.isNotNull(res.body.token);
        assert.equal(res.body.token.split('.').length, 3);
        assert.equal(res.body.message,
          'Welcome newUser. This is your dashboard');
        assert.equal(res.body.firstName, mock.newUser.firstName);
        assert.equal(res.body.lastName, mock.newUser.lastName);
        done();
      });
  });
  it('should sign in user', (done) => {
    const user = { ...mock.newUser };
    server
      .post('/api/v1/users/signin')
      .send({ ...user })
      .expect(200)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.token);
        assert.equal(res.body.token.split('.').length, 3);
        assert.equal(res.body.firstName, user.firstName);
        assert.equal(res.body.lastName, user.lastName);
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
          assert.equal(res.status, 403);
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
          assert.equal(res.status, 403);
          assert.equal(res.body.message,
            'wrong username and password combination');
          done();
        });
    });
  describe('#updateUserInfo', () => {
    before((done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.newUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });
    it('should update user data', (done) => {
      server
        .put('/api/v1/users')
        .send({ firstName: 'Tolu' })
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.lastName, mock.newUser.lastName);
          assert.notEqual(res.body.firstName, mock.newUser.firstName);
          assert.equal(res.body.firstName, 'Tolu');
          assert.equal(res.body.message,
            'Your information was successfully updated');
          done();
        });
    });
    it('should update password', (done) => {
      server
        .put('/api/v1/users')
        .send({ ...mock.updatenewUser })
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.firstName, 'Tolu');
          assert.equal(res.body.message,
            'Your information was successfully updated');
          done();
        });
    });
    describe('#getBorrowedBooks', () => {
      before((done) => {
        server
          .post('/api/v1/users/signin')
          .send(mock.adminUser)
          .end((err, res) => {
            jwtToken = res.body.token;
            done();
          });
      });
      it('should allow users view all the books they have borrowed',
        (done) => {
          server
            .get('/api/v1/users/1/books')
            .set('X-ACCESS-TOKEN', jwtToken)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.books[0].title, 'eloquent fish');
              assert.equal(res.body.books[0].id, 4);
              assert.equal(res.body.books[0].categoryId, 1);
              done();
            });
        });
      it('should allow users view books they have not returned',
        (done) => {
          server
            .get('/api/v1/users/1/books?returned=false')
            .set('X-ACCESS-TOKEN', jwtToken)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert(res.body.books);
              assert(Array.isArray(res.body.books));
              assert.equal(res.body.books[0].title, 'eloquent fish');
              assert.equal(res.body.books[0].id, 4);
              assert.equal(res.body.books[0].categoryId, 1);
              assert.equal(res.body.books[1].title, 'eloquent ruby');
              assert.equal(res.body.books[1].id, 2);
              assert.equal(res.body.books[1].categoryId, 2);
              done();
            });
        });
      it('should allow users view books they have returned',
        (done) => {
          server
            .get('/api/v1/users/1/books?returned=true')
            .set('X-ACCESS-TOKEN', jwtToken)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert(res.body.books);
              assert(Array.isArray(res.body.books));
              assert.equal(res.body.books[0].title, 'Learn Rust');
              assert.equal(res.body.books[0].id, 1);
              assert.equal(res.body.books[0].categoryId, 1);

              done();
            });
        });
    });
  });

  describe('#passwordResetMail', () => {
    it('should send an error message if email field is empty', (done) => {
      server
        .post('/api/v1/users/forgot-password')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Email cannot be empty');
          done();
        });
    });
    it('should send password reset mail to user', (done) => {
      transporter.sendMail = () => Promise.resolve(1);
      server
        .post('/api/v1/users/forgot-password')
        .send({ email: 'newUser@newuser.newuser' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message,
            'A password reset link has been sent to your email');
        });
      done();
    });
    it('should send an error message if email provided is not associated with an account',
      (done) => {
        server
          .post('/api/v1/users/forgot-password')
          .send({ email: 'someMade@up.email' })
          .end((err, res) => {
            assert.equal(res.status, 404);
            assert.equal(res.body.message,
              'Email does not match any account in our records');
            done();
          });
      });
    it('should send an error message if an error occured while sending email',
      (done) => {
        transporter.sendMail = () => Promise.reject(1);
        server
          .post('/api/v1/users/forgot-password')
          .send({ email: 'newUser@newuser.newuser' })
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'An error occured while sending you a link. Try again');
            done();
          });
      });
  });
});

describe('USER SERVER ERRORS', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox = sandbox.restore();
  });
  describe('CREATE USER ERRORS', () => {
    it('should send a message if an error occurs while creating an account',
      (done) => {
        const stub = sandbox.stub(User, 'create');
        stub.rejects();
        server
          .post('/api/v1/users/signup')
          .send(modelMock.newUser)
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });

    it('should send a message if an error occurs while verifying an account',
      (done) => {
        const stub = sandbox.stub(User, 'find');
        stub.rejects();
        server
          .post('/api/v1/users/signup')
          .send(modelMock.newUser)
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });
  });

  describe('GET USER ERRORS', () => {
    it('should send a message if an error occurs while creating an account',
      (done) => {
        const stub = sandbox.stub(User, 'findOne');
        stub.rejects();
        server
          .post('/api/v1/users/signin')
          .send({
            ...modelMock.newUser,
            username: 'something-else',
            email: 'anewOne@newone.com'
          })
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.equal(res.body.message,
              'Something went wrong. Internal server error');
            done();
          });
      });

    it('should send a message if an error occurs while verifying an account',
      (done) => {
        const stub = sandbox.stub(bcrypt, 'compare');
        stub.rejects();
        server
          .post('/api/v1/users/signin')
          .send(mock.adminUser)
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
