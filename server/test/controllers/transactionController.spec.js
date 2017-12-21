import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../../app';
import mock from '../mock/mock';
import { Notification } from '../../models';

const server = supertest.agent(app);
let jwtToken;

describe('Transaction Controller', () => {
  describe('Admin Notifications', () => {
    before((done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.adminUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });
    it('should fetch admin notifications', (done) => {
      server
        .get('/api/v1/admin-notifications?limit=2&offset=0')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(Array.isArray(res.body.notifications))
          assert(res.body.metadata)
          assert(res.body.notifications.length > 0)
          done();
        })
    })
  })
  describe('User Transaction History', () => {
    before((done) => {
      server
        .post('/api/v1/users/signin')
        .send(mock.googleUser)
        .end((err, res) => {
          jwtToken = res.body.token;
          done();
        });
    });
    it('should user transaction history', (done) => {
      server
        .get('/api/v1/users/3/transactions')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(Array.isArray(res.body.notifications))
          assert(res.body.metadata)
          done()
        })
    })
    it('should send a message if an error occured while getting notifications', () => {
      Notification.findAndCountAll = () => Promise.reject(1);
      server
        .get('/api/v1/users/3/transactions')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(500)
        .end((err, res) => {
          assert.equal(res.status, 500);
          assert(res.body.error)
          done()
        })
    })
  })
})
