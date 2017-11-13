import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-materialize';

/**
 * component for borrowed Books
 * @param {Object} props Object containing array of borrowed Books
 * @return {JSX}         JSX representation of component
 */
const Borrowed = (props) => {
  const books = props.borrowedBooks && props.borrowedBooks.length ?
    props.borrowedBooks.map(book =>
      <Col key={book.title} s={12} className="book-info grey-text">
        <div className="card horizontal">
          <div className="card-image">
            <img
              src={book.cover || 'https://segunolalive.github.io/helloBooks/' +
              'templates/images/eloquentjs_cover.png'}
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
                onClick={() => props.readBook(book.id)}
              >
                Read Book
              </Button>
            </div>
            <div className="card-action center">
              <Button
                waves='light'
                onClick={() => props.returnBook(book.id)}
              >
                Return Book
              </Button>
            </div>
          </div>
        </div>
      </Col>
    )
    : <h5 className="center">Nothing here</h5>;
  return (
    <section className="col s12 m6 borrowed">
      <Col s={12}>
        <h4 className="center">Recently Borrowed</h4>
      </Col>
      {books}
    </section>
  );
};


Borrowed.propTypes = {
  borrowedBooks: PropTypes.array,
  readBook: PropTypes.func,
  returnBook: PropTypes.func,
};


export default Borrowed;
