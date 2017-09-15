import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import BooksTable from './BooksTable';
import Categories from './Categories';
import Search from './Search';
import Loading from '../Loading';

import { borrowBook, fetchBooks, getBookCategories, filterBooksByCategory } from '../../actions/library';
import { viewBookDetails } from '../../actions/viewBook';

/*
  eslint-disable
 */
class Library extends Component {
  constructor (props) {
    super(props);
    this.handleBorrowBook = this.handleBorrowBook.bind(this);
    this.handleViewBookDetail = this.handleViewBookDetail.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount () {
    this.props.fetchBooks();
    this.props.getBookCategories();
  }

  handleBorrowBook (bookId) {
    this.props.borrowBook(this.props.userId, bookId);
  }

  handleViewBookDetail (bookId) {
    this.props.viewBookDetails(bookId);
  }

  handleSelectCategory (event) {
    let category = event.target.value;
    this.props.filterBooksByCategory(category);
  }

  render () {
    console.log('view Book Details\n', this.props.viewBookDetails(1));
    const categories = this.props.categories ?
    <Categories
      text="Filter By Category"
      className="col s12 m8 offset-m2 l6"
      categories={this.props.categories}
      onChange={this.handleSelectCategory}
    /> : null
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
                viewBookDetails={this.handleViewBookDetail}
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
    categories: bookReducer.categories,
    userId,
  }
};

export default connect(
  mapStateToProps,
  {
    borrowBook,
    fetchBooks,
    viewBookDetails,
    getBookCategories,
    filterBooksByCategory,
  }
)(Library);
