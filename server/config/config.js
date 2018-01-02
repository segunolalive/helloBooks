const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect,
  },
  // test: {
  //   use_env_variable: 'DATABASE_URL_TEST',
  // },
  test: {
    username: process.env.test_username,
    password: process.env.test_password,
    database: process.env.test_database,
    host: process.env.localhost,
    dialect: process.env.dialect,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  }
};
