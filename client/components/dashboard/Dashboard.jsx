import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';

import { fetchBorrowedBooks, returnBook } from '../../actions/borrowedBooks';

const Materialize = window.Materialize;

/**
 * dashboard component
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {Object} props Object containing properties for dashboard
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.handleReturnBook = this.handleReturnBook.bind(this);
    this.readBook = this.readBook.bind(this);
  }

  /**
   * lifecycle hook called when component is mounted to DOM
   * @memberof Dashboard
   * @returns {Undefined} fetches borrowed books
   */
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchBorrowedBooks(this.props.user.id);
    }
  }

  /**
   * handles redirect
   *
   * @returns {Component} redirect component
   * @memberof Dashboard
   */
  handleRedirect() {
    Materialize.toast('Login to proceed', 3000, 'red darken-4');
    return (<Redirect to='/login'/>);
  }

  /**
   * handler for returning book
   *
   * @param {Integer}     bookId book id
   * @memberof Dashboard
   * @returns {Undefined} calls return book api
   */
  handleReturnBook(bookId) {
    this.props.returnBook(this.props.user.id, bookId);
  }

  /**
   * handler for reading book
   * @param {any} id book id
   * @memberof Dashboard
   * @returns {any} book
   */
  readBook(id) {
    // TODO: implement readBook
  }

  /**
   * renders component to DOM
   * @returns {JSX} JSX representation of component
   * @memberof Dashboard
   */
  render() {
    const fullname = this.props.user && (
      this.props.user.firstName || this.props.user.lastName
    ) ?
      `${this.props.user.firstName} ${this.props.user.lastName}` : null;
    return (
      this.props.isLoggedIn !== true ?
        this.handleRedirect() :
        <div>
          <Header
            activeLink='dashboard'
          />
          <main>
            <Row>
              <Col s={12}>
                <ProfileInfo
                  name={fullname}
                />
                <Borrowed
                  borrowedBooks={this.props.borrowedBooks}
                  readBook={this.readBook}
                  returnBook={this.handleReturnBook}
                />
                <SuggestedBooks />
              </Col>
            </Row>
          </main>
        </div>
    );
  }
}

Dashboard.propTypes = {
  borrowedBooks: PropTypes.array,
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  fetchBorrowedBooks: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
  borrowedBooks: bookReducer.borrowedBooks,
});

export default connect(
  mapStateToProps,
  { fetchBorrowedBooks, returnBook }
)(Dashboard);
