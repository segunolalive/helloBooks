import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';

import Header from '../Header';
import TransactionHistory from './TransactionHistory';
import AllBorrowed from './AllBorrowed';
import { fetchHistory, fetchTransactionHistory } from '../../actions/history';


/**
 * component for borrowing hisstory
 * @class History
 * @extends {Component}
 */
class History extends Component {
  /**
   * lifecycle hook called when component mounts
   * @memberof History
   * @return {Undefined} - makes api calls to fetch a user's borrowed books
   * and borrowing history
   */
  componentDidMount() {
    this.props.fetchHistory(this.props.id);
    this.props.fetchTransactionHistory(this.props.id);
  }
  /**
   * renders  component to DOM
   * @return {JSX} JSX
   */
  render() {
    const historyDisplay =
      this.props.location.pathname === '/history/transactions' ?
        <TransactionHistory transactions={this.props.transactions}/> :
        <AllBorrowed books={this.props.books}/>;

    return (
      <div>
        <Header activeLink="history"/>
        <main className="">
          <Row>
            {historyDisplay}
          </Row>
        </main>
      </div>
    );
  }
}


History.propTypes = {
  id: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  fetchHistory: PropTypes.func.isRequired,
  transactions: PropTypes.array.isRequired,
  fetchTransactionHistory: PropTypes.func.isRequired
};

const mapStateToProps = ({ authReducer, transactionReducer }) => ({
  id: authReducer.user && authReducer.user.id,
  books: transactionReducer.allBorrowed,
  transactions: transactionReducer.transactions,
});

export default connect(
  mapStateToProps, { fetchHistory, fetchTransactionHistory }
)(History);
