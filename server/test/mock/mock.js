import faker from 'faker';

const data = {
  adminUser: {
    username: 'Segun',
    password: 'password',
    email: 'abc@gmail.com',
    firstName: 'Segun',
    lastName: 'Ola',
    isAdmin: true,
  },
  wrongPassword: {
    username: 'Segun',
    password: 'flyhigh',
    email: 'abc@gmail.com',
    firstName: 'Segun',
    lastName: 'Ola',
    isAdmin: true,
  },
  newUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
  },
  newUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password',
  },
  existingEmail: {
    username: 'baba',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'abc@gmail.com',
    password: 'password'
  },
  existingUsername: {
    username: 'Segun',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password'
  },
  nonExistentUsername: {
    username: 'Segunfly',
    password: 'password'
  },
};

export default data;
