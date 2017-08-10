const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'hellobooks',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'hellobooksTest',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: 'bqqcndgg',
    password: 'sFziUyi8b-5TV3B3KX8iAVTTn81PWTXJ',
    database: 'bqqcndgg',
    dialect: 'postgres',
  }
  // production: {
  //   use_env_variable: 'DATABASE_URL',
  //   dialect: 'postgres',
  // }
};
