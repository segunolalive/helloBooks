import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-materialize';


const SuggestedBooks = (props) => {
  const books = props.suggestedBooks ? props.suggestedBooks.map(book =>
    <figure key={book.title}>
      <img src={book.cover || 'N/A'} alt={book.title || 'book cover'} />
      <figcaption>{book.title || ''}</figcaption>
    </figure>
  )
    : <h5 className="center">Nothing here</h5>;
  return (
    <Col m={3} className="suggestions hide-on-small-and-down">
      <Col s={12}>
        <h4 className="center">Suggestions</h4>
        <div className="img-suggestion">
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
