import supertest from 'supertest';
import { assert, expect } from 'chai';
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
          assert.equal(res.body.message, 'Welcome to the Hello Books API!')
          done();
        })
    })
  })
  describe('#unknown Route', () => {
    it('should send an error message', (done) => {
      server
        .get('/api/v1/some-unknown-route')
        .expect(404)
        .end((req, res) => {
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Seems like you might be lost')
          done();
        })
    })
  })

  describe('Static files', () => {
    it('should serve client for unknown routes on root domain', (done) => {
      server
        .get('/*')
        .expect(200)
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
          done();
        })
    })
    it('should serve static docs', (done) => {
      server
        .get('/docs')
        .expect(200)
        .end((req, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.header['content-type'], 'text/html; charset=UTF-8');
          done();
        })
    })
    it('should serve client service worker file', (done) => {
      server
        .get('/sw.js')
        .expect(200)
        .end((req, res) => {
          assert.equal(res.status, 200);
          expect(res.header['content-type']).to.have.string('application/javascript');
          done();
        })
    })
    it('should serve client app mainfest', (done) => {
      server
        .get('/manifest.json')
        .expect(200)
        .end((req, res) => {
          assert.equal(res.status, 200);
          expect(res.header['content-type']).to.have.string('application/json');
          done();
        })
    })
  })
})
