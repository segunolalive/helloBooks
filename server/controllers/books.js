import { Book, BorrowedBook, BookCategory } from '../models';

/**
 * Fetch all books that match a catagory from database
 * @private
 * @method
 * @param  {object} req - express http request object
 * @param  {object} res - express http response object
 * @return {undefined}
 */
const filterBooksByCategory = (req, res) => {
  const category = req.query.category;
  BookCategory.findAll({ where: { category } })
    .then((books) => {
      const message = books.length ? '' : 'No books in match the requested category';
      res.status(200).send({
        success: true,
        data: books,
        message,
      });
    })
    .catch(error => res.status(500).send({
      success: false,
      error
    }));
};


export default {
  /**
   * Add new book category to library.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  addCategory(req, res) {
    if (req.user && req.user.isAdmin) {
      return BookCategory
        .create(req.body)
        .then(category => res.status(201).send({
          success: true,
          message: `Successfully added new category, ${category.category}, to Library`,
        }))
        .catch(error => res.status(500).send({
          success: false,
          error
        }));
    }
    res.status(401).send({
      success: false,
      message: 'unauthorized access',
    });
  },
  /**
   * Fetch Bppk Categories.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  getBookCategories(req, res) {
    BookCategory.findAll()
      .then((categories) => {
        res.status(200).send({
          success: true,
          data: categories,
        });
      })
      .catch(error => res.status(500).send({
        success: false,
        error
      }));
  },

  /**
   * Add new book to library.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  createBook(req, res) {
    if (req.user && req.user.isAdmin) {
      return Book
        .create(req.body)
        .then(book => res.status(201).send({
          success: true,
          message: `Successfully added ${book.title} to Library`,
          data: book,
        }))
        .catch(error => res.status(500).send({
          success: false,
          error
        }));
    }
    res.status(401).send({
      success: false,
      message: 'unauthorized access',
    });
  },

  /**
   * Fetch a specific book
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  getBook(req, res) {
    const id = Number(req.params.id);
    Book.findById(id)
      .then((book) => {
        if (!book) {
          res.status(404).send({
            success: false,
            message: 'book does not exist',
          });
          return;
        }
        res.status(200).send({
          success: true,
          data: book,
        });
      })
      .catch(error => res.status(500).send({
        success: false,
        error
      }));
  },

  /**
   * Fetch all books present in database
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  getAllBooks(req, res) {
    if (req.query.category) {
      return filterBooksByCategory(req, res);
    }
    Book.findAll()
      .then((books) => {
        if (!books.length) {
          res.status(200).send({
            success: true,
            data: [],
            message: 'Library is currently empty. Check back later'
          });
          return;
        }
        res.status(200).send({
          success: true,
          data: books,
        });
      })
      .catch(error => res.status(500).send({
        success: false,
        error
      }));
  },

  /**
   * Edit a book's metadata.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  editBookInfo(req, res) {
    const id = req.params.id;
    if (req.user && req.user.isAdmin) {
      Book.update(
        req.body,
        { where: { id },
          returning: true,
          plain: true,
        })
        .then(book => res.status(200).send({
          success: true,
          data: book,
        }))
        .catch(error => res.status(500).send({
          success: false,
          error,
        }));
    } else {
      res.status(401).send({
        success: false,
        message: 'unauthorized access',
      });
    }
  },

  /**
   * Delete a book from database.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  deleteBook(req, res) {
    const id = req.params.id;
    if (req.user && req.user.isAdmin) {
      Book.destroy({ where: { id } })
        .then(() => res.status(200).send({
          success: true,
          message: 'Successfully deleted book from database',
        }))
        .catch(error => res.status(500).send({
          success: false,
          error,
        }));
    } else {
      res.status(401).send({
        success: false,
        message: 'unauthorized access',
      });
    }
  },

  /**
   * Allow user borrow book.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  borrowBook(req, res) {
    const userId = req.params.id;
    const bookId = req.body.id;
    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          res.status(404).send({
            success: false,
            message: 'Book not found',
          });
          return;
        }
        if (book.total <= 0) {
          res.status(404).send({
            success: false,
            message: 'There are no available copies of this book at this time',
          });
          return;
        }
        BorrowedBook.findOne({ where: { userId, bookId } })
          .then((borrowed) => {
            if (borrowed && borrowed.returned === false) {
              res.status(403).send({
                success: false,
                message: 'You currently have this book. Return it before trying to borrow it again',
              });
              return;
            } else if (borrowed && borrowed.returned === true) {
              borrowed.returned = false;
              borrowed.save();
              book.total -= 1;
              book.save();
              res.status(200).send({
                success: true,
                message: `You have successfully borrowed ${book.title} again. Check your profile to read it`,
              });
              return;
            }
            BorrowedBook.create({
              userId, bookId,
            })
              .then(() => {
                book.total -= 1;
                book.save();
              })
              .then(() => res.status(200).send({
                success: true,
                message: `You have successfully borrowed ${book.title}. Check your profile to read it`,
              }))
              .catch((error) => {
                res.status(500).send({
                  success: false,
                  error
                });
              });
          });
      })
      .catch(error => res.status(500).send({
        success: false,
        error,
      }));
  },

  /**
   * Allow user return borrowed book.
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {undefined}
   */
  returnBook(req, res) {
    const bookId = req.body.id;
    const userId = req.params.id;
    BorrowedBook.findOne({ where: { userId, bookId, returned: false } })
      .then((borrowedBook) => {
        if (borrowedBook) {
          BorrowedBook.update({
            returned: true,
          }, {
            where: { userId, bookId, returned: false }
          }).then(() => {
            Book.findById(bookId)
              .then((book) => {
                book.total += 1;
                return book;
              })
              .then((book) => {
                res.status(201).send({
                  success: true,
                  message: `You have successfully returned ${book.title}`,
                });
              });
          });
          return;
        }
        res.status(400).send({
          success: false,
          message: 'This book is currently not on your list. You have either returned it or never borrowed it'
        });
      })
      .catch(error => res.status(500).send({
        success: false,
        error,
      }));
  }
};
