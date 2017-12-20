import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../app';

const server = supertest.agent(app);

describe('Routes', () => {
  describe('#Home Route', () => {
    it('should send a welcome message', (done) => {
      server
        .get('/api/v1')
        .expect(200)
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, 'Welcome to the Hello Books API!');
          done();
        });
    });
  });
  describe('#unknown Route', () => {
    it('should send an error message', (done) => {
      server
        .get('/api/v1/some-unknown-route')
        .expect(404)
        .end((req, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Seems like you might be lost');
          done();
        });
    });
  });

  describe('Static files', () => {
    it('should serve client for unknown routes on root domain', (done) => {
      server
        .get('/*')
        .expect(200)
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
          assert.containsAllKeys(res, ['text']);
          assert.equal(res.text.slice(0, 15), '<!doctype html>');
          done();
        });
    });
    it('should serve static docs', (done) => {
      server
        .get('/api-docs')
        .end((req, res) => {
          assert.equal(res.status, 301);
          assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
          done();
        });
    });
  });
});
