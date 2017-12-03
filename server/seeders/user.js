import db from '../models';
import { getJWT } from '../helpers/helpers';

const passwordResetToken = getJWT({ id: 2 }, '1h');

db.User.sync()
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
      isAdmin: false,
      passwordResetToken
    },
    ], { individualHooks: true })
      .then(() => {
        process.stdout.write('Test Users created \n');
      }).then(() => {
        process.exit();
      });
  });
