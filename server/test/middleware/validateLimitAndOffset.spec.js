import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../../app';
import mock from '../mock/mock';

const server = supertest.agent(app);

describe('#validateLimitAndOffset', () => {
  it('should send an error message if limit is not an integer', (done) => {
    server
      .get('/api/v1/books?limit=abc')
      .expect(400)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, 'Please set the limit as an integer');
        done();
      });
  });
  it('should send an error message if offset is not an integer', (done) => {
    server
      .get('/api/v1/books?offset=abc')
      .expect(400)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, 'Please set the offset as an integer');
        done();
      });
  });
});
