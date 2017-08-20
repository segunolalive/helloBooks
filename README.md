[![Build Status](https://travis-ci.org/segunolalive/helloBooks.svg?branch=master)](https://travis-ci.org/segunolalive/helloBooks)
[![Coverage Status](https://coveralls.io/repos/github/segunolalive/helloBooks/badge.svg?branch=master)](https://coveralls.io/github/segunolalive/helloBooks?branch=master)
[![Code Climate](https://codeclimate.com/github/segunolalive/helloBooks/badges/gpa.svg)](https://codeclimate.com/github/segunolalive/helloBooks?branch=master)

# helloBooks

### A Library app
Hello books is an application that provides users with access to books from wherever they are.
Beeing a virtual library, users can borrow and read their favorite books using any device.
HelloBooks exposes RESTful API endpoints such that anyone customize the method of consuming
the resources.

### Development
This is a javascript application built with [**Express**](http://expressjs.com/)
framework on the nodejs platform. Authentication of users is done via
[**JSON Web Tokens**](https://jwt.io/) .

#### Features
- Login/Sign up to gain access to routes
- A library of books from different categories
- Ability to borrow books repeatedly
- Track your reading/borrowing history
- Admin access to modify book details

#### API Routes
- sign up route:
**POST** /api/v1/users/signup
parameters - username, password, email
optional parameters - firstName, lastName


- login route:
**POST** /api/v1/users/signin
parameters - username, password

- get books (view library):
**GET** /api/v1/books'

- get book (view a book's metadata):
**GET** /api/v1/books/:id
parameters - bookId (number)

- add a new book to library:
**POST** /api/v1/books
request body - authors, title, description, cover, bookfile, total

- modify book information:
**PUT** /api/v1/books/
request body - authors, title, description, cover, bookfile, total (any)
query parameters - book id (number)

- borrow book:
**POST** /api/v1/users/:id/books
parameters - user id
query parameters - book id (number)

- return book:
**PUT** /api/v1/users/:id/books
parameters - user id
query parameters - book id (number)

- get borrowed books:
**GET** /api/v1/users/:id/books
