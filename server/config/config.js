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
  }
};

