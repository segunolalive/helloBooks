import { Book } from '../models';


export default {
  createBook(req, res) {
    return Book
      .create({
        title: req.body.title,
        authors: req.body.authors,
        total: req.body.total,
        description: req.body.description,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  getBook(req, res) {
    const id = Number(req.params.id);
    Book.findById(id)
      .then((book) => {
        if (!book) {
          res.send('book does not exist');
          return;
        }
        res.send(book);
      })
      .catch(error => res.status(400).send(error));
  },
  getAllBooks(req, res) {
    Book.findAll()
      .then((books) => {
        if (!books.length) {
          res.send('Library is currently empty. Check back later');
          return;
        }
        res.send(books);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  editBookInfo(req, res) {
    const id = req.params.id;
    Book.update(
      req.body,
      { where: { id },
        returning: true,
        plain: true,
      })
      .then(book => res.send(book))
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};
