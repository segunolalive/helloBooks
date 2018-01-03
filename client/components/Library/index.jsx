import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';
import InfiniteScroll from 'react-infinite-scroller';

import Header from '../Header';
import BooksTable from './BooksTable';
import Categories from '../common/Categories';
import Search from './Search';
import Loading from '../common/Loading';

import { hasMore, getOffset } from '../../utils/paginationUtils';

import {
  borrowBook,
  fetchBooks,
  getBookCategories,
  filterBooksByCategory
} from '../../actions/bookActions/library';


/**
 * displays the content of the library
 *
 * @class Library
 *
 * @extends {Component}
 */
export class Library extends Component {
  state = { hasMore: false };

  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof Library
   *
   * @return {undefined} fetches books and book categories
   */
  componentDidMount() {
    const { pageSize, pageNumber } = this.props.pagination;
    const offset = getOffset.bind(this)(pageNumber, pageSize);
    this.props.fetchBooks();
    this.props.getBookCategories({ offset });
  }

  /**
   * called when component receives new propTypes
   *
   * @param  {Object} nextProps
   *
   * @return {undefined}        calls set setState
   */
  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      hasMore: hasMore(this.props.pagination, nextProps.pagination)
    }));
  }

  /**
   * handles borrowing book
   *
   * @method
   *
   * @memberof Library
   *
   * @param {Integer} bookId
   *
   * @returns {undefined} sends a request to borrow a book
   */
  handleBorrowBook = (bookId) => {
    this.props.borrowBook(this.props.userId, bookId);
  }

  /**
   * selects a category to filter books by
   *
   * @param {any} event
   *
   * @memberof Library
   *
   * @returns {Object} books of specified category
   */
  handleSelectCategory = (event) => {
    const categoryId = event.target.value;
    return Number(categoryId) ?
      this.props.filterBooksByCategory(categoryId) :
      this.props.fetchBooks({ offset: 0 });
  }

  /**
   * handles fetching of Books
   *
   * @return {Function} thunk
   */
  handleFetchBooks = () => {
    const { pageSize, pageNumber } = this.props.pagination;
    const offset = getOffset.bind(this)(pageNumber, pageSize);
    const search = this.state.search && this.state.search.trim();
    const options = search ? { search, offset } : { offset };
    return this.props.fetchBooks(options);
  }

  /**
   * updates state with value of search input
   *
   * @param  {Object} event  form submission event
   *
   * @return {undefined}     calls setState
   */
  handleSearchChange = (event) => {
    event.preventDefault();
    const search = event.target.value;
    this.setState(() => ({ search }));
  }

  /**
   * searches for books matching input value
   *
   * @param  {Object} event  form submission event
   *
   * @return {undefined}       sends a network request
   */
  handleSearch = (event) => {
    event.preventDefault();
    const search = this.state.search.trim();
    return search ?
      this.props.fetchBooks({ search, offset: 0 }) :
      this.props.fetchBooks({ offset: 0 });
  }

  /**
   * renders library component to DOM
   *
   * @memberof Library
   *
   * @returns {JSX} JSX element representing library component
   */
  render() {
    const loaderDisplay = this.props.fetchingBooks ?
      <Loading text="fetching awesome books . . ." /> :
      <div className="center">
        <p style={{ fontWeight: 900 }}>
          unable to fetch books
        </p>
        <h4>&#x1F61E;</h4>
      </div>;
    const { pageCount, pageNumber } = this.props.pagination;
    const reachedEnd = pageNumber >= pageCount;
    const endText = this.props.books.length ?
      'You\'ve gotten to the bottom of the shelf' :
      'Nothing found. Try something else';
    const endMessage = reachedEnd ?
      <div className="center">
        <p style={{ fontWeight: 900 }}>
          {endText}
        </p>
        <h4>☺</h4>
      </div> : loaderDisplay;
    const categories = this.props.categories ?
      <Categories
        text="Filter By Category"
        className="col s12 m8 offset-m2 l5"
        indexVal={0}
        indexText="clear filter"
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
              <Row>
                <Col s={12} className="center">
                  <h2 className="bold-text">All Books</h2>
                  <p>Click on a title to see book details</p>
                </Col>
                <Col s={12}>
                  {categories}
                  <Search
                    className="col s12 m8 offset-m2 l6 offset-l1"
                    onSubmit={this.handleSearch}
                    onClick={this.handleSearch}
                    onChange={this.handleSearchChange}
                  />
                </Col>
              </Row>
              <Row>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.handleFetchBooks}
                  hasMore={this.state.hasMore}
                >
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
                </InfiniteScroll>
              </Row>
              <div>
                {endMessage}
              </div>
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
  fetchingBooks: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  getBookCategories: PropTypes.func.isRequired,
  filterBooksByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  books: bookReducer.books,
  categories: bookReducer.categories,
  pagination: bookReducer.pagination,
  fetchingBooks: bookReducer.fetchingBooks,
  userId: authReducer.user.id,
});

export default connect(
  mapStateToProps,
  {
    borrowBook,
    fetchBooks,
    getBookCategories,
    filterBooksByCategory,
  }
)(Library);
