import faker from 'faker';
import { getJWT } from '../../helpers/helpers';

export const passwordResetToken = getJWT({ id: 2 }, '1h');


const data = {
  adminUser: {
    username: 'Segun',
    password: 'password',
    confirmPassword: 'password',
    email: 'abc@gmail.com',
    firstName: 'Segun',
    lastName: 'Ola',
    isAdmin: true,
  },
  user2: {
    username: 'debo',
    password: 'password',
    email: 'abcd@gmail.com',
    firstName: 'Debo',
    lastName: 'Ola',
    isAdmin: false,
    passwordResetToken
  },
  wrongPassword: {
    username: 'Segun',
    password: 'flyhigh',
    confirmPassword: 'flyhigh',
    email: 'abc@gmail.com',
    firstName: 'Segun',
    lastName: 'Ola',
    isAdmin: true,
  },
  newUser: {
    username: 'newUserAccount',
    firstName: 'newUser',
    lastName: faker.name.lastName(),
    email: 'newUser@newuser.newuser',
    password: 'password',
    confirmPassword: 'password',
    membershipType: 'silver',
  },
  updatenewUser: {
    firstName: 'Tolu',
    lastName: '',
    password: 'password',
    newPassword: 'newpassword'
  },
  resetuserPassword: {
    password: 'password',
    passwordResetToken,
  },
  newUser2: {
    username: 'newUser2',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
  },
  newUserBookCategory: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
  },
  existingEmail: {
    username: 'baba',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'abc@gmail.com',
    password: 'password',
    confirmPassword: 'password'
  },
  existingUsername: {
    username: 'Segun',
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
    confirmPassword: 'password'
  },
  nonExistentUsername: {
    username: 'Segunfly',
    password: 'password'
  },
  funnyUser: {
    username: faker.internet.userName(),
    firstName: 'funny',
    lastName: 'veryFunny',
    email: faker.internet.email(),
    password: 'password',
    membershipType: 'gold',
  },
  googleUser: {
    googleId: 'asdf1234',
    username: faker.internet.userName(),
    firstName: 'funny',
    lastName: 'veryFunny',
    email: faker.internet.email(),
    password: 'password',
    membershipType: 'gold',
  },
  addBook: {
    title: 'eloquent testing',
    authors: 'flo harrison',
    total: 10,
    description: 'test destruction',
  },
};

export const modelMock = {
  newUser: {
    username: 'modelUser',
    email: 'modelUser@email.com',
    password: 'password',
    confirmPassword: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
  },

  newBook: {
    title: 'modelBook',
    description: 'modelBook description',
    authors: 'Temilaj',
    categoryId: 1,
  }
};

export default data;
