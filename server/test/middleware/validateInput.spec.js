import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../app';
import mock from '../mock/mock';


const server = supertest.agent(app);

describe('validateInput', () => {
  describe('signup', () => {
    it('returns an error message if username is not supplied', (done) => {
      server
        .post('/api/v1/users/signup')
        .send({ ...mock.adminUser, username: '' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Username is required');
          done();
        });
    });

    it('returns an error message if email is not supplied', (done) => {
      server
        .post('/api/v1/users/signup')
        .send({ ...mock.adminUser, email: '' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Email is required');
          done();
        });
    });

    it('returns an error message if password is not supplied', (done) => {
      server
        .post('/api/v1/users/signup')
        .send({ ...mock.adminUser, password: '' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Password is required');
          done();
        });
    });

    it('returns an error message if passwords do not match', (done) => {
      server
        .post('/api/v1/users/signup')
        .send({
          ...mock.adminUser,
          password: 'blah',
          confirmPassword: 'blahblah'
        })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Passwords do not match');
          done();
        });
    });
  });

  describe('signup', () => {
    it('returns an error message if username is not supplied', (done) => {
      server
        .post('/api/v1/users/signin')
        .send({ ...mock.adminUser, username: '' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Username is required');
          done();
        });
    });

    it('returns an error message if password is not supplied', (done) => {
      server
        .post('/api/v1/users/signin')
        .send({ ...mock.adminUser, password: '' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, 'Password is required');
          done();
        });
    });
  });
});
