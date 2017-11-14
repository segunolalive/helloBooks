import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../../app';
import models from '../../models/index';
import { hashPassword, getJWT } from '../../helpers/helpers';
import mock from '../mock/mock';


// const server = supertest.agent(app);
describe('helpers', () => {
  describe('hashPassword', () => {
    it('hashes and salts password and saves it on the user object', () => {
      const password = mock.newUser.password;
      const hashedUser = hashPassword(mock.newUser);
      expect(password).to.not.equal(hashedUser.password);
      expect(password.length).toBeLessThan(hashedUser.password.length);
      // bcrypt hash (10 rounds) is 60 characters long
      expect(hashedUser.password.length).to.equal(60);
    });
  });
  describe('getJWT', () => {
    it('signs a jsonwebtoken with the given credentials', () => {
      const options = {
        isAdmin: false,
        name: 'foo',
      }
      const jwt = getJWT(options);
      // jsonwebtokens have two period characters
      expect(jwt.split('.').length - 1).to.equal(2);
    })
  });
});
