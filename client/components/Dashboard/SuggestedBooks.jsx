import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-materialize';
import { Link } from 'react-router-dom';

/**
 * book Suggestions
 *
 * @param {Object} props Object containing array of suggestions
 *
 * @returns {JSX}        JSX representation of component
 */
const SuggestedBooks = (props) => {
  const books = props.suggestedBooks ? props.suggestedBooks.map(book =>
    <Link key={book.title} to={`library/book/${book.id}`}>
      <div className="suggestion">
        <figure className="center bottom-20">
          <figcaption>
            <h5 className="bold-text">{book.title || ''}</h5 >
          </figcaption>
          <img src={book.cover || BOOK_IMAGE_FALLBACK}
            alt={book.title || 'book cover'} style={{ maxWidth: '100%' }}
          />
        </figure>
      </div>
    </Link>
  ) : <h5 className="center">Nothing here</h5>;
  return (
    <Col m={3} className="suggestions hide-on-small-and-down">
      <Col s={12}>
        <h4 className="center suggestion">Suggestions</h4>
        <div className="img-suggestion center">
          {books}
        </div>
      </Col>
    </Col>
  );
};


SuggestedBooks.propTypes = {
  suggestedBooks: PropTypes.array,
};


export default SuggestedBooks;
