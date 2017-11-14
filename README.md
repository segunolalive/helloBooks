[![Build Status](https://travis-ci.org/segunolalive/helloBooks.svg?branch=development)](https://travis-ci.org/segunolalive/helloBooks)
[![Coverage Status](https://coveralls.io/repos/github/segunolalive/helloBooks/badge.svg?branch=development)](https://coveralls.io/github/segunolalive/helloBooks?branch=development)
[![Code Climate](https://codeclimate.com/github/segunolalive/helloBooks/badges/gpa.svg)](https://codeclimate.com/github/segunolalive/helloBooks?branch=development)

# helloBooks

### A Library app
Hello books is an application that provides users with access to books from wherever they are.
Being a virtual library, users can borrow and read their favorite books using any device.
HelloBooks exposes RESTful API endpoints such that anyone customize the method of consuming
the resources.

#### Built With
* [NodeJS](https://nodejs.org/en/) - is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Sequelize](http://docs.sequelizejs.com/) - is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* [ExpressJS](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [Reactjs](https://reactjs.org/)A declarative component-based JavaScript library for building user interfaces


#### Getting Started
```
# Clone your fork of this repository

# Ensure NodeJS, PostgreSQL and Sequelize cli are globally installed

# Switch to project directory
cd helloBooks

# Install dependencies
npm install

# Set up environment variables
Follow the template in example.environment

# Run database migrations
npm run migrate:dev

# Start the app
- In development mode, run the following from two separate terminal windows/tabs
npm run start:client
npm run start:dev

navigate to http://localhost:8080 in your browser

- For production build, run:
npm run building
then
npm run start
```

#### Features
- Authentication is via [**JSON Web Tokens**](https://jwt.io/)
- Login/Sign up to gain access to routes
- A library of books from different categories
- Ability to borrow books repeatedly
- Track your reading/borrowing history
- Admin access to add and modify book details

#### API Documentation
- https://www.segunolalive-hellobooks.com/api/docs


#### Testing
Run `npm test`

#### Contributing
Hello books is open source and contributions are highly welcomed.

If you would like to contribute, follow the instructions below.

- Fork this project.
- Checkout a new branch
- Make your changes and commit.
- Keep commit messages atomic.
- Raise a pull request against development.

**NB:** All Pull requests must be made against development branch. PRs against master would be rejected.

See project wiki for coding style guide, commit message, pull request and branch naming conventions.

---

#### Acknowledgments

* Andela Fellowship (https://andela.com/)

---
#### License
MIT License
