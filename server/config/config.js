import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: 'postgres',
    password: process.env.password,
    database: process.env.database_dev,
    host: process.env.host,
    dialect: process.env.dialect,
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
