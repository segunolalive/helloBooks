import supertest from 'supertest';
import { assert } from 'chai';

import app from '../../app';
import '../../models/index';
import mock from '../mock/mock';
import { transporter } from '../../config/mail';


const server = supertest.agent(app);
let jwtToken;

describe('userController', () => {
  it('should sign up user', (done) => {
    server
      .post('/api/v1/users/signup')
      .send({ ...mock.newUser })
      .expect(201)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.token);
        assert.equal(res.body.message,
          'Welcome newUser. This is your dashboard');
        done();
      });
  });
  it('should sign in user', (done) => {
    server
      .post('/api/v1/users/signin')
      .send({ ...mock.googleUser })
      .expect(200)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isNotNull(res.body.token);
        assert.equal(res.body.token.split('.').length, 3);
        done();
      });
  });
  it('should respond with a message when trying to ' +
  'signup with existing email',
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
  it('should respond with a message when trying to ' +
  'signup with existing username',
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
  it('should respond with a message when trying to ' +
  'sign in with nonexistent username',
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
    it('should send an error message if email provided is ' +
    'not associated with an account', (done) => {
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
    it('should send an error message if an error occured ' +
    'while sending email', (done) => {
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
