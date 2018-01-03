import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';

import { fetchBorrowedBooks,
  returnBook,
  getSuggestedBooks,
  readBook,
} from '../../actions/bookActions/borrowedBooks';
import LoginRedirect from '../auth/LoginRedirect';


/**
 * dashboard component
 *
 * @class Dashboard
 *
 * @extends {Component}
 */
export class Dashboard extends Component {
  state = {}
  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof Dashboard
   *
   * @returns {undefined} fetches borrowed books
   */
  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchBorrowedBooks(this.props.user.id);
    }
    this.props.getSuggestedBooks();
  }

  /**
   * handler for returning book
   *
   * @param {Integer} bookId book id
   *
   * @memberof Dashboard
   *
   * @returns {undefined}    calls return book prop
   */
  handleReturnBook = bookId =>
    this.props.returnBook(this.props.user.id, bookId);

  /**
   * handler for reading book
   *
   * @param {string} bookUrl
   *
   * @memberof Dashboard
   *
   * @returns {undefined} calls readBook prop
   */
  readBook = (bookUrl) => {
    this.props.readBook(bookUrl);
    this.setState(() => ({ reading: true }));
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
   *
   * @returns {JSX} JSX representation of component
   *
   * @memberof Dashboard
   */
  render() {
    return (
      this.props.isLoggedIn !== true ?
        <LoginRedirect /> : this.renderPage()
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
  readBook: PropTypes.func.isRequired,
  suggestedBooks: PropTypes.array,
  getSuggestedBooks: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
  borrowedBooks: bookReducer.borrowedBooks,
  fetchingBorrowedBooks: bookReducer.fetchingBorrowedBooks,
  suggestedBooks: bookReducer.suggestedBooks,
});

export default connect(
  mapStateToProps,
  { fetchBorrowedBooks, returnBook, getSuggestedBooks, readBook }
)(Dashboard);
