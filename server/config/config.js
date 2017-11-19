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
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
  },
  testDev: {
    username: process.env.test_username,
    password: process.env.test_password,
    database: process.env.test_database,
    host: process.env.test_host,
    dialect: process.env.test_dialect,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  }
};
