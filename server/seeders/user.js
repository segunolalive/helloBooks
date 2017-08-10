import db from '../models';

db.User.sync({ force: true })
  .then(() => {
    db.User.bulkCreate([{
      username: 'Segun',
      password: 'password',
      email: 'abc@gmail.com',
      firstName: 'Segun',
      lastName: 'Ola',
      isAdmin: true,
    },
    {
      username: 'debo',
      password: 'password',
      email: 'abcd@gmail.com',
      firstName: 'Debo',
      lastName: 'Ola',
      isAdmin: false
    },
    ], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test Users created \n');
      });
  });
