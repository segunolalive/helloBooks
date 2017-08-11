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
    use_env_variable: 'DATABASE_URL_TEST',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    // username: 'bqqcndgg',
    // password: 'sFziUyi8b-5TV3B3KX8iAVTTn81PWTXJ',
    // database: 'bqqcndgg',
    // dialect: 'postgres',
    // host: 'babar.elephantsql.com'
  }
  // production: {
  //   use_env_variable: 'DATABASE_URL',
  //   dialect: 'postgres',
  // }
};
