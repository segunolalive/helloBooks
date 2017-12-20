import supertest from 'supertest';
import { assert } from 'chai';
import sinon from 'sinon';
import app from '../../app';
import mock from '../mock';
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
          assert(Array.isArray(res.body.notifications));
          assert(res.body.metadata);
          assert.equal(res.body.metadata.pageNumber, 1);
          assert.equal(res.body.metadata.pageCount, 2);
          assert.equal(res.body.metadata.total, 3);
          assert(res.body.notifications.length > 0);
          assert.equal(res.body.notifications[0].type, 'return');
          assert.equal(res.body.notifications[0].bookTitle, 'eloquent javascript');
          assert.equal(res.body.notifications[1].type, 'borrow');
          assert.equal(res.body.notifications[1].bookTitle, 'eloquent ruby');
          done();
        });
    });
  });
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
    it('should fetch user transaction history', (done) => {
      server
        .get('/api/v1/users/2/transactions')
        .set('X-ACCESS-TOKEN', jwtToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert(res.body.notifications);
          assert(Array.isArray(res.body.notifications));
          assert(res.body.metadata);
          assert.equal(res.body.metadata.pageNumber, 1);
          assert.equal(res.body.metadata.pageCount, 0);
          assert.equal(res.body.metadata.total, 0);
          done();
        });
    });
    it('should send a message if an error occured while getting notifications',
      (done) => {
        let sandbox = sinon.sandbox.create();
        const stub = sandbox.stub(Notification, 'findAndCountAll');
        stub.rejects();
        server
          .get('/api/v1/users/3/transactions')
          .set('X-ACCESS-TOKEN', jwtToken)
          .expect(500)
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert(res.body.error);
            sandbox = sandbox.restore();
            done();
          });
      });
  });
});
