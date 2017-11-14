import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-materialize';

import { addBook, addBookCategory, editBook } from '../../actions/adminActions';
import { fetchNotifications } from '../../actions/notifications';
import { getBookCategories } from '../../actions/library';

import Header from '../Header';
import BookForm from './BookForm';
import Notifications from './Notifications';
import AddCategoryForm from './CategoryForm';

/**
 * adds or edits book
 *
 * @class Admin
 * @extends {Component}
 */
class Admin extends Component {
  /**
   * Creates an instance of AddBook.
   * @param {any} props
   * @memberof AddBook
   */
  constructor(props) {
    super(props);
    this.shouldEdit = this.props.location.pathname.match(/^\/admin\/edit/);
    this.state = this.shouldEdit ? {
      title: this.props.book.title || '',
      authors: this.props.book.authors || '',
      description: this.props.book.description || '',
      categoryId: this.props.book.categoryId || '',
      total: this.props.book.total || '',
      cover: this.props.book.cover || '',
      bookFile: this.props.book.bookFile || '',
    } : {
      title: '',
      authors: '',
      description: '',
      categoryId: '',
      total: '',
      cover: '',
      bookFile: '',
    };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }

  /**
   * lifecycle methods called after component mounts the DOM
   * @memberof AddBook
   * @returns {Undefined} fetches book categories and admin notifications
   */
  componentDidMount() {
    this.props.getBookCategories();
    this.props.fetchNotifications();
  }

  /**
   * form submission handler
   *
   * @param {any} event
   * @memberof AddBook
   * @returns {Undefined} submits form
   */
  handleFormSubmission(event) {
    event.preventDefault();
    if (this.shouldEdit) {
      this.props.editBook(this.props.book.id, this.state)
        .then(() => this.props.history.push('/library'));
    } else {
      this.props.addBook(this.state)
        .then(() => (
          this.setState(() => ({
            title: '',
            authors: '',
            description: '',
            categoryId: '',
            total: '',
            cover: '',
            bookFile: '',
          }))
        ));
    }
  }

  /**
   * updates component state when form values (except select field) change
   *
   * @param {any} event
   * @memberof AddBook
   * @returns {Undefined} calls setState
   */
  handleFieldChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const data = { ...this.state };
    if (event.target.value.trim()) {
      data[formField] = event.target.value.trim();
    }
    this.setState(() => data);
  }

  /**
   * handles selection of book category
   *
   * @param {any} event
   * @memberof AddBook
   * @returns {Undefined} calls setState
   */
  handleSelectCategory(event) {
    this.setState(() => ({ categoryId: event.target.value }));
  }

  /**
   * handles adding a new category
   *
   * @param {any} event
   * @memberof AddBook
   * @returns {Undefined} updatea list of categories
   */
  handleAddCategory(event) {
    event.preventDefault();
    const category = event.target.category.value.trim();
    if (category) {
      this.props.addBookCategory(category);
      event.target.category.value = '';
    }
    this.props.getBookCategories();
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of component
   * @memberof AddBook
   */
  render() {
    const text = this.shouldEdit ?
      'Edit Book Information' :
      'Add Book To Library';
    return (this.props.user && this.props.user.isAdmin ?
      <div>
        <Header activeLink='admin' />
        <main>
          <Row>
            <div className="container admin-container">
              <Row>
                <Col s={12} m={6}>
                  <div className="col s12 admin-form center">
                    <BookForm
                      heading={text}
                      book={this.state}
                      categories={this.props.categories}
                      onSelectCategory={this.handleSelectCategory}
                      onChange={this.handleFieldChange}
                      onSubmit={this.handleFormSubmission}
                    />
                  </div>
                  <div className="col s12 admin-form center">
                    <AddCategoryForm
                      onSubmit={this.handleAddCategory}
                    />
                  </div>
                </Col>
                <div className="col s12 m5 offset-m1 admin-form">
                  <h5 className="center">Notifications</h5>
                  <Notifications notifications={this.props.notifications}/>
                </div>
              </Row>
            </div>
          </Row>
        </main>
      </div> : <Redirect to='/dashboard' />
    );
  }
}

Admin.propTypes = {
  user: PropTypes.object.isRequired,
  book: PropTypes.object,
  categories: PropTypes.array.isRequired,
  notifications: PropTypes.array.isRequired,
  addBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  getBookCategories: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  addBookCategory: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};


const mapStateToProps = ({ authReducer, bookReducer, notifications }) => ({
  user: authReducer.user,
  book: bookReducer.currentBook,
  categories: bookReducer.categories,
  notifications,
});

export default connect(
  mapStateToProps,
  { addBook, addBookCategory, editBook, getBookCategories, fetchNotifications }
)(Admin);
