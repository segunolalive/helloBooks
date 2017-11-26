import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';

const TransactionHistory = (props) => {
  const transactions = props.transactions.length ?
    props.transactions.map(
      transaction => (
        <Col s={12}
          key={transaction.id}
          className=""
        >
          <p>
           You {transaction.type}ed {transaction.bookTitle}
            {` ${moment(transaction.createdAt).fromNow()}`}
          </p>
        </Col>
      )
    ) :
    <div>
      <p>
        Nothing to show. Head over to the library to borrow some books
      </p>
    </div>;
  return (props.fetchingTransactions ?
    <Loading text="fetching your transactions" /> :
    <div className="center">
      <div className="col s12">
        <Link
          to="/history"
          className="btn blue darken-4 right"
        >
          View Borrowing History
        </Link>
      </div>
      <div className="col s12">
        <h4 className="center">All Transactions</h4>
        <div className="container borrowed-list">
          {transactions}
        </div>
      </div>
    </div>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
  fetchingTransactions: PropTypes.bool.isRequired,
};

export default TransactionHistory;
