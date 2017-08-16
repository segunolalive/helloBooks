import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../../app';
import models from '../../models/index';
import { hashPassword, getJWT } from '../../helpers/helpers';
import mock from '../mock/mock';


// const server = supertest.agent(app);
describe('helpers', () => {
  describe('hashPassword', () => {
    it('hashes and salts password and saves it on the user', () => {
      const password = mock.newUser.password;
      const hashedUser = hashPassword(mock.newUser);
      expect(password).to.not.equal(hashedUser.password);
    });
  });
  describe('getJWT', () => {

  });
});
