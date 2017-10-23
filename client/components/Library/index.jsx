import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';

import Header from '../Header';
import BooksTable from './BooksTable';
import Categories from './Categories';
import Search from './Search';
import Loading from '../Loading';

import {
  borrowBook,
  fetchBooks,
  getBookCategories,
  filterBooksByCategory
} from '../../actions/library';


/**
 * displays the content of the library
 *
 * @class Library
 * @extends {Component}
 */
class Library extends Component {
  /**
   * Creates an instance of Library.
   * @param {any} props
   * @memberof Library
   */
  constructor(props) {
    super(props);
    this.handleBorrowBook = this.handleBorrowBook.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof Library
   * @return {Undefined} fetches books and boo categories
   */
  componentDidMount() {
    this.props.fetchBooks();
    this.props.getBookCategories();
  }

  /**
   * handles borrowing book
   * @method
   * @param {Integer} bookId
   * @memberof Library
   * @returns {Undefined} sends a request to borrow a book
   */
  handleBorrowBook(bookId) {
    this.props.borrowBook(this.props.userId, bookId);
  }

  /**
   * selects a category to filter books by
   *
   * @param {any} event
   * @memberof Library
   * @returns {Undefined} send request to fetch books by specified category
   */
  handleSelectCategory(event) {
    const category = event.target.value;
    this.props.filterBooksByCategory(category);
  }

  /**
   * renders library component to DOM
   *
   * @returns {JSX} JSX element representing library component
   * @memberof Library
   */
  render() {
    const categories = this.props.categories ?
      <Categories
        text="Filter By Category"
        className="col s12 m8 offset-m2 l6"
        categories={this.props.categories}
        onChange={this.handleSelectCategory}
      /> : null;
    return (
      <div>
        <Header
          activeLink='library'
        />
        <main className="white-area">
          <Row>
            <div className="container">
              <Col s={12} className="center">
                <h3 className="">All Books</h3>
                <p>Click on a title to see book details</p>
              </Col>
              {categories}
              <Search
                className="col s12 m8 offset-m2 l6"
              />
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

Library.propTypes = {
  userId: PropTypes.number,
  books: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  borrowBook: PropTypes.func.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  getBookCategories: PropTypes.func.isRequired,
  filterBooksByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => {
  const userId = authReducer.user && authReducer.user.id;
  return {
    books: bookReducer.books,
    categories: bookReducer.categories,
    userId,
  };
};

export default connect(
  mapStateToProps,
  {
    borrowBook,
    fetchBooks,
    getBookCategories,
    filterBooksByCategory,
  }
)(Library);
