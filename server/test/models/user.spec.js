import { expect } from 'chai';
import { User } from '../../models';
import { modelMock } from '../mock';

describe('User Model', () => {
  let newUserId;

  it('should create a User', (done) => {
    User.create(modelMock.newUser)
      .then((user) => {
        newUserId = user.dataValues.id;
        expect(user.dataValues.firstName)
          .to.equal(modelMock.newUser.firstName);
        done();
      });
  });

  it('should raise validation error if email already exists',
    (done) => {
      User.create({ ...modelMock.newUser, username: 'somethingMadeUp' })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('email must be unique');
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].path).to.equal('email');
          done();
        });
    });

  it('should find a user', (done) => {
    User.findById(newUserId)
      .then((user) => {
        expect(user.dataValues.firstName)
          .to.equal(modelMock.newUser.firstName);
        done();
      });
  });

  it('should update a user', (done) => {
    User.findById(newUserId)
      .then((user) => {
        user.update({ firstName: 'Segun' })
          .then((updatedUser) => {
            expect(updatedUser.dataValues.id).to.equal(newUserId);
            expect(updatedUser.dataValues.firstName).to.equal('Segun');
            expect(updatedUser.dataValues.username)
              .to.equal(modelMock.newUser.username);
            done();
          });
      });
  });

  it('should delete a user', (done) => {
    User.findById(newUserId)
      .then((user) => {
        user.destroy()
          .then((result) => {
            expect(result).to.deep.equal([]);
            done();
          });
      });
  });
});
