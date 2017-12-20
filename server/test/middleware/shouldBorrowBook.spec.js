import supertest from 'supertest';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import app from '../../app';
import { canBorrowBook }
  from '../../middleware/shouldBorrowBook';
import { User } from '../../models';
import mock from '../mock';

const server = supertest.agent(app);

describe('shouldBorrowBook', () => {
  let jwtToken;
  before((done) => {
    server
      .post('/api/v1/users/signin')
      .send(mock.adminUser)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });

  it('handles server errors', (done) => {
    let sandbox = sinon.sandbox.create();
    const stub = sandbox.stub(User, 'findOne');
    stub.rejects();
    server
      .post('/api/v1/users/1/books')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ id: 4 })
      .expect(500)
      .end((err, res) => {
        assert.equal(res.status, 500);
        assert.equal(res.body.message,
          'Something went wrong. Internal server error');
        sandbox = sandbox.restore();
        done();
      });
  });

  describe('#canBorrowBook helper', () => {
    it('returns false for unknown membership type', () => {
      const result = canBorrowBook(5, null);
      expect(result).to.equal(false);
    });

    it('checks for bronze membership type', () => {
      const result = canBorrowBook(5, 'bronze');
      expect(result).to.equal(false);
    });

    it('checks for silver membership type', () => {
      const result = canBorrowBook(5, 'silver');
      expect(result).to.equal(true);
    });

    it('checks for gold membership type', () => {
      const result = canBorrowBook(5, 'gold');
      expect(result).to.equal(true);
    });
  });
});
