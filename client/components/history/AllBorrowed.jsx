import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'react-materialize';

import BorrowedTable from './BorrowedTable';

/**
 * shows all books borrowed by user
 * @param {Object} props - props object
 * @returns {JSX}        - JSX representation of all books borrowed by user
 */
const AllBorrowed = props => (
  <Row>
    <div
      className="col s12"
      style={{ marginRight: '10px' }}>
      <Link
        to="/history/transactions"
        className="btn blue darken-4 right"
      >
        View Transaction history
      </Link>
    </div>
    <div className="col s12 center">
      <h4 className="">Your Borrowed Books</h4>
    </div>
    <BorrowedTable books={props.books} />
  </Row>
);

AllBorrowed.propTypes = {
  books: PropTypes.array.isRequired,
};

export default AllBorrowed;
