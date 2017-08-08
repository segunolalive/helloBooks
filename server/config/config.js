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
    username: process.env.username,
    password: 'null',
    database: process.env.database_test,
    host: process.env.host,
    dialect: process.env.dialect,
  },
  production: {
    username: 'postgres',
    password: 'null',
    database: 'hellobooks',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
