import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col } from 'react-materialize';


const TransactionHistory = (props) => {
  const transactions = props.transactions ? props.transactions.map(
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
  ) : 'Nothing to show. Head over to the library to borrow some books';
  return (
    <div className="center">
      <h4 className="center">All Transactions</h4>
      <div className="container borrowed-list">
        {transactions}
      </div>
    </div>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionHistory;
