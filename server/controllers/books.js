import { Book, BorrowedBook } from '../models';


export default {
  createBook(req, res) {
    if (req.user && req.user.isAdmin) {
      return Book
        .create(req.body)
        .then(user => res.status(201).send({
          success: false,
          user,
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
  getAllBooks(req, res) {
    Book.findAll()
      .then((books) => {
        if (!books.length) {
          res.send('Library is currently empty. Check back later');
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
          error
        }));
    } else {
      res.status(401).send({
        success: false,
        message: 'unauthorized access',
      });
    }
  },
  borrowBook(req, res) {
    const userId = req.params.id;
    const bookId = req.query.id;
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
                message: `You have successfully borrowed ${book.title} again
                check your profile to read read it`,
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
                message: `You have successfully borrowed ${book.title}
                check your profile to read read it`,
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
  returnBook(req, res) {
    const bookId = req.query.id;
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
              })
              .then(() => {
                res.status(201).send({
                  success: true,
                  message: 'You have successfully returned book',
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

