import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';

import { fetchBorrowedBooks, returnBook } from '../../actions/borrowedBooks';

/*
 eslint-disable
 */
class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.handleFetchBorrowedBooks = this.handleFetchBorrowedBooks.bind(this);
    this.handleReturnBook = this.handleReturnBook.bind(this);
    this.readBook = this.readBook.bind(this);
  }

  componentDidMount () {
    if (this.props.user) {
    this.handleFetchBorrowedBooks();
    }
  }

  handleFetchBorrowedBooks () {
    this.props.fetchBorrowedBooks(this.props.user.id);
  }

  handleRedirect () {
    Materialize.toast('Login to proceed', 3000, 'red darken-4');
    return (<Redirect to='/login'/>)
  }

  handleReturnBook(bookId) {
    this.props.returnBook(this.props.user.id, bookId);
  }

  readBook (id) {

  }

  render() {
    const fullname = this.props.user && (
      this.props.user.firstName || this.props.user.lasstName
    ) ?
    `${this.props.user.firstName} ${this.props.user.lastName}`: null
    return (
      this.props.isLoggedIn !== true ?
      this.handleRedirect() :
      <div>
        <Header
          navLinks={['dashboard', 'history', 'library', 'logout']}
          activeLink='dashboard'
        />
        <main>
          <Row>
            <Col s={12}>
              <ProfileInfo name={fullname}/>
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

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
  borrowedBooks: bookReducer.borrowedBooks,
});

export default connect(
  mapStateToProps,
  { fetchBorrowedBooks, returnBook }
)(Dashboard);
