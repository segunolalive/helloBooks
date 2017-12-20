import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-materialize';
import Loading from '../common/Loading';


/**
 * component for borrowed Books
 *
 * @param {Object} props  Object containing array of borrowed Books
 *
 * @return {JSX}          JSX representation of component
 */
const Borrowed = (props) => {
  const books = props.borrowedBooks && props.borrowedBooks.length ?
    props.borrowedBooks.map(book =>
      <Col key={book.title} s={12} className="book-info grey-tex">
        <div className="card horizontal">
          <div className="card-image">
            <img
              src={book.cover || BOOK_IMAGE_FALLBACK}
              alt={book.title || 'N/A'}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h6 className="bold-text black-text">
                {book.title.toUpperCase() || null}
              </h6>
            </div>
            <div className="card-action center">
              <Button
                waves='light'
                id={`read-book-${book.id}-btn`}
                onClick={() => props.readBook(book.bookFile)}
              >
                Read Book
              </Button>
            </div>
            <div className="card-action center">
              <Button
                waves='light'
                id={`return-book-${book.id}-btn`}
                onClick={() => props.returnBook(book.id)}
              >
                Return Book
              </Button>
            </div>
          </div>
        </div>
      </Col>
    ) :
    <div className="center">
      <h5>Nothing here</h5>
      <p>Head over to the library to change that</p>
    </div>;
  const renderedContent = props.fetchingBorrowedBooks ?
    <Loading text='fetching your books' /> : books;
  return (
    <section className="col s12 m6 borrowed fill-page-height">
      <Col s={12}>
        <h4 className="center">Recently Borrowed</h4>
      </Col>
      {renderedContent}
    </section>
  );
};


Borrowed.propTypes = {
  borrowedBooks: PropTypes.array.isRequired,
  readBook: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
  fetchingBorrowedBooks: PropTypes.bool.isRequired,
};


export default Borrowed;
