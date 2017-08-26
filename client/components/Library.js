import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-materialize';

import BooksTable from './BooksTable';
import Categories from './Categories';
import Search from './Search';
import BookLoader from './BookLoader';


/**
 * 
 */
const Library = props => (
  <Row>
    <div className="container">
      <Col s={12} className="center">
        <h3 className="">All Books</h3>
        <p>Click on a title to see book details</p>
      </Col>
      <Categories categories={props.categories} />
      <Search />
      <BooksTable
        books={props.books}
        headers={[
          'Cover',
          'Title',
          'Author(s)',
          'Copies Available',
          'Action'
        ]}
      />
      <BookLoader />
    </div>
  </Row>
);


Library.propTypes = {
  books: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default Library;
