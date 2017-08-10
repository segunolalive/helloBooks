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
    url: 'postgres://jmjbrcfp:FvHq4yiSgqDPdzPa0v1NzLITLEgee5NI@pellefant.db.elephantsql.com:5432/jmjbrcfp',
    dialect: 'postgres',
    protocol: 'postgres',
  }
};
