import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';

import Header from '../Header';
import TransactionHistory from './TransactionHistory';
import AllBorrowed from './AllBorrowed';
import { fetchHistory, fetchTransactionHistory } from '../../actions/history';
import LoginRedirect from '../auth/LoginRedirect';


/**
 * component for borrowing hisstory
 *
 * @class History
 *
 * @extends {Component}
 */
export class History extends Component {
  /**
   * lifecycle hook called when component mounts
   * @memberof History
   * @return {undefined} - makes api calls to fetch a user's borrowed books
   * and borrowing history
   */
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchHistory(this.props.id);
      this.props.fetchTransactionHistory(null, this.props.id);
    }
  }

  /**
   * renders  component to DOM
   *
   * @return {JSX} JSX
   */
  render() {
    const historyDisplay =
      this.props.location.pathname === '/history/transactions' ?
        <TransactionHistory
          transactions={this.props.transactions}
          fetchingTransactions={this.props.fetchingTransactions}
        /> :
        <AllBorrowed
          books={this.props.books}
          fetchingHistory={this.props.fetchingHistory}
        />;

    return (
      this.props.isLoggedIn ?
        <div>
          <Header activeLink="history"/>
          <main id="history">
            <Row>
              {historyDisplay}
            </Row>
          </main>
        </div> : <LoginRedirect />
    );
  }
}


History.propTypes = {
  id: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  fetchHistory: PropTypes.func.isRequired,
  fetchingHistory: PropTypes.bool.isRequired,
  transactions: PropTypes.array.isRequired,
  fetchTransactionHistory: PropTypes.func.isRequired,
  fetchingTransactions: PropTypes.bool.isRequired
};

const mapStateToProps = ({ authReducer, transactionReducer }) => ({
  id: authReducer.user.id,
  isLoggedIn: authReducer.isLoggedIn,
  books: transactionReducer.allBorrowed,
  transactions: transactionReducer.transactions,
  fetchingHistory: transactionReducer.fetchingHistory,
  fetchingTransactions: transactionReducer.fetchingTransactions
});

export default connect(
  mapStateToProps, { fetchHistory, fetchTransactionHistory }
)(History);
