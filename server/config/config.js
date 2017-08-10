// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

// export default {
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
    username: 'postgres',
    password: 'null',
    database: 'hellobooks',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
