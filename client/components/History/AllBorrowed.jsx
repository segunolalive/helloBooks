import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'react-materialize';

import BorrowedTable from './BorrowedTable';
import Loading from '../common/Loading';

/**
 * shows all books borrowed by user
 *
 * @param {Object} props - props object
 *
 * @returns {JSX}        - JSX representation of all books borrowed by user
 */
const AllBorrowed = props => (props.fetchingHistory ?
  <Loading text="fetching your borrowing history" /> :
  <Row>
    <div className="">
      <div
        className="col s12"
        style={{ marginRight: '10px' }}>
        <Link
          to="/history/transactions"
          id="view-transactions-btn"
          className="btn blue darken-4 right"
        >
          View Transaction History
        </Link>
      </div>
      <div className="col s12 center">
        <h4 className="bold-text" id="page-message">Your Borrowed Books</h4>
      </div>
      <BorrowedTable books={props.books} />
    </div>
  </Row>
);

AllBorrowed.propTypes = {
  books: PropTypes.array.isRequired,
  fetchingHistory: PropTypes.bool.isRequired,
};

export default AllBorrowed;
