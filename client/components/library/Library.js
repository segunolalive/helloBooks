import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import BooksTable from './BooksTable';
import Categories from './Categories';
import Search from './Search';
import Loading from '../Loading';

import { borrowBook, fetchBooks } from '../../actions/library';

import mock from '../mock'; // FIXME: Load this over the wire in lifecycle hooks

/*
  eslint-disable
 */
class Library extends Component {
  constructor (props) {
    super(props);
    this.handleBorrowBook = this.handleBorrowBook.bind(this);
  }

  componentDidMount () {
    this.props.fetchBooks();
  }

  handleBorrowBook (bookId) {
    this.props.borrowBook(this.props.userId, bookId);
  }

  render () {
    return (
      <div>
        <Header
          navLinks={['dashboard', 'history', 'library']}
          activeLink='library'
        />
        <main className="white-area">
          <Row>
            <div className="container">
              <Col s={12} className="center">
                <h3 className="">All Books</h3>
                <p>Click on a title to see book details</p>
              </Col>
              <Categories categories={mock.categories} /> {/** FIXME: */}
              <Search />
              <BooksTable
                borrowBook={this.handleBorrowBook}
                bookList={this.props.books}
                tableHeaders={[
                  'Cover',
                  'Title',
                  'Author(s)',
                  'Copies Available',
                  'Action'
                ]}
              />
              <Loading text="fetching more awesome books . . ." />
            </div>
          </Row>
        </main>
      </div>
    );

  }
}


const mapStateToProps = ({ authReducer, bookReducer }) => {
  const userId = authReducer.user && authReducer.user.id;
  return {
    books: bookReducer.books,
    userId,
  }
};

export default connect(mapStateToProps, { borrowBook, fetchBooks })(Library);
