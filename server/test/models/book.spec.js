import { expect } from 'chai';
import { modelMock } from '../mock';
import { Book } from '../../models';


describe('Book Model', () => {
  let newBookId;

  it('should create a book', (done) => {
    Book.create(modelMock.newBook)
      .then((book) => {
        newBookId = book.dataValues.id;
        expect(book.dataValues.title).to.equal(modelMock.newBook.title);
        done();
      });
  });

  it('should find a book', (done) => {
    Book.findById(newBookId)
      .then((book) => {
        expect(book.dataValues.title).to.equal(modelMock.newBook.title);
        done();
      });
  });

  it('should raise validation error if title already exists',
    (done) => {
      Book.create({ ...modelMock.newBook, username: 'somethingMadeUp' })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('title must be unique');
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].path).to.equal('title');
          done();
        });
    });

  it('should update a book', (done) => {
    Book.findById(newBookId)
      .then((book) => {
        book.update({ total: 200 })
          .then((updatedBook) => {
            expect(updatedBook.dataValues.id).to.equal(newBookId);
            expect(updatedBook.dataValues.total).to.equal(200);
            expect(updatedBook.dataValues.title)
              .to.equal(modelMock.newBook.title);
            done();
          });
      });
  });

  it('should delete a book', (done) => {
    Book.findById(newBookId)
      .then((book) => {
        book.destroy()
          .then((result) => {
            expect(result).to.deep.equal([]);
            done();
          });
      });
  });
});
