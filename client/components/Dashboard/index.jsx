import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';

import Header from '../Header';
import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';

import { fetchBorrowedBooks,
  returnBook } from '../../actions/bookActions/borrowedBooks';
import LoginRedirect from '../auth/LoginRedirect';


/**
 * dashboard component
 * @class Dashboard
 * @extends {Component}
 */
export class Dashboard extends Component {
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
    if (this.props.user.id) {
      this.props.fetchBorrowedBooks(this.props.user.id);
    }
  }

  /**
   * handler for returning book
   *
   * @param {Integer} bookId book id
   * @memberof Dashboard
   * @returns {Undefined}    calls return book api
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

  renderPage = () => {
    const fullname = this.props.user && (
      this.props.user.firstName || this.props.user.lastName
    ) ?
      `${this.props.user.firstName || ''} ${this.props.user.lastName || ''}` :
      null;
    return this.state.reading ? <Redirect to="/read" /> :
      <div>
        <Header
          activeLink='dashboard'
        />
        <main id="dashboard">
          <Row>
            <Col s={12}>
              <ProfileInfo
                name={fullname}
              />
              <Borrowed
                borrowedBooks={this.props.borrowedBooks}
                readBook={this.readBook}
                returnBook={this.handleReturnBook}
                fetchingBorrowedBooks={this.props.fetchingBorrowedBooks}
              />
              <SuggestedBooks suggestedBooks={this.props.suggestedBooks} />
            </Col>
          </Row>
        </main>
      </div>;
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
        <LoginRedirect /> :
        <div>
          <Header
            activeLink='dashboard'
          />
          <main id="dashboard">
            <Row>
              <Col s={12}>
                <ProfileInfo
                  name={fullname}
                />
                <Borrowed
                  borrowedBooks={this.props.borrowedBooks}
                  readBook={this.readBook}
                  returnBook={this.handleReturnBook}
                  fetchingBorrowedBooks={this.props.fetchingBorrowedBooks}
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
  isLoggedIn: PropTypes.bool.isRequired,
  fetchBorrowedBooks: PropTypes.func.isRequired,
  fetchingBorrowedBooks: PropTypes.bool.isRequired,
  returnBook: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
  borrowedBooks: bookReducer.borrowedBooks,
  fetchingBorrowedBooks: bookReducer.fetchingBorrowedBooks,
});

export default connect(
  mapStateToProps,
  { fetchBorrowedBooks, returnBook }
)(Dashboard);
