import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';

import Header from '../header/Header';
import TransactionHistory from './TransactionHistory';
import AllBorrowed from './AllBorrowed';
import { fetchHistory, fetchTransactionHistory } from '../../actions/history';


/*
eslint-disable
 */
class History extends Component {
  componentDidMount () {
    this.props.fetchHistory(this.props.id);
    this.props.fetchTransactionHistory(this.props.id);
  }
  render() {
    const historyDisplay =
      this.props.location.pathname === '/history/transactions' ?
      <TransactionHistory transactions={this.props.transactions}/> :
      <AllBorrowed books={this.props.books}/>

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
  };
}


History.propTypes = {
  books: PropTypes.array.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  id: authReducer.user && authReducer.user.id,
  books: bookReducer.allBorrowed,
  transactions: bookReducer.transactions,
});

export default connect(
  mapStateToProps, { fetchHistory, fetchTransactionHistory }
)(History);
