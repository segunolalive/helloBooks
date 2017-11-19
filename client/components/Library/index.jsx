import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';
import InfiniteScroll from 'react-infinite-scroller';

import Header from '../Header';
import BooksTable from './BooksTable';
import Categories from './Categories';
import Search from './Search';
import Loading from '../utils/Loading';

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
    this.handleFetchBooks = this.handleFetchBooks.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = { hasMore: false };
  }

  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof Library
   * @return {undefined} fetches books and boo categories
   */
  componentDidMount() {
    this.props.fetchBooks();
    this.props.getBookCategories();
  }

  /**
   * called when component receives new propTypes
   * @param  {Object} nextProps
   * @return {undefined}        calls set setState
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.pagination !== nextProps.pagination) {
      const hasMore = nextProps.pagination.pageCount >=
        nextProps.pagination.pageNumber;
      this.setState({
        hasMore
      });
    }
  }

  /**
   * handles borrowing book
   * @method
   * @param {Integer} bookId
   * @memberof Library
   * @returns {undefined} sends a request to borrow a book
   */
  handleBorrowBook(bookId) {
    this.props.borrowBook(this.props.userId, bookId);
  }

  /**
   * selects a category to filter books by
   *
   * @param {any} event
   * @memberof Library
   * @returns {undefined} send request to fetch books by specified category
   */
  handleSelectCategory(event) {
    const categoryId = event.target.value;
    return Number(categoryId) ?
      this.props.filterBooksByCategory(categoryId) :
      this.props.fetchBooks({ offset: 0 });
  }

  /**
   * handles fetching of Books
   * @return {Function} thunk
   */
  handleFetchBooks() {
    const { pageSize, pageNumber } = this.props.pagination;
    let offset = 0;
    if (pageSize && pageNumber) {
      offset = pageSize * pageNumber;
    }
    const search = this.state.search && this.state.search.trim();
    const options = search ? { search, offset } : { offset };
    this.setState({
      hasMore: false
    });
    return this.props.fetchBooks(options);
  }

  /**
   * updates state with value of search input
   * @param  {object} event  form submission event
   * @return {undefined}     calls setState
   */
  handleSearchChange(event) {
    event.preventDefault();
    const search = event.target.value;
    this.setState(() => ({ search }));
  }

  /**
   * searches for books matching input value
   * @param  {object} event  form submission event
   * @return {undefined}       sends a network request
   */
  handleSearch(event) {
    event.preventDefault();
    if (!this.state.search) {
      return;
    }
    const search = this.state.search.trim();
    return search ?
      this.props.fetchBooks({ search, offset: 0 }) :
      this.props.fetchBooks({ offset: 0 });
  }

  /**
   * renders library component to DOM
   *
   * @returns {JSX} JSX element representing library component
   * @memberof Library
   */
  render() {
    const { pageCount, pageNumber } = this.props.pagination;
    const reachedEnd = pageNumber >= pageCount;
    const endMessage = reachedEnd ?
      <p className="center" style={{ fontWeight: 900 }}>
        That&apos;s all for now
      </p> :
      <Loading text="fetching more awesome books . . ." />;
    const categories = this.props.categories ?
      <Categories
        text="Filter By Category"
        className="col s12 m8 offset-m2 l5"
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
              {endMessage}
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
  pagination: PropTypes.object.isRequired,
  getBookCategories: PropTypes.func.isRequired,
  filterBooksByCategory: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => {
  const userId = authReducer.user && authReducer.user.id;
  return {
    books: bookReducer.books,
    categories: bookReducer.categories,
    pagination: bookReducer.pagination,
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
