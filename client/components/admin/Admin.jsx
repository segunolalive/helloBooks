import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';

import { addBook, addBookCategory, editBook } from '../../actions/adminActions';
import { fetchNotifications } from '../../actions/notifications';
import { getBookCategories } from '../../actions/library';

import Header from '../header/Header';
import BookForm from './BookForm';
import Notifications from './Notifications';
import AddCategoryForm from './CategoryForm';

/**
 * adds or edits book
 *
 * @class AddBook
 * @extends {Component}
 */
class AddBook extends Component {
  /**
   * Creates an instance of AddBook.
   * @param {any} props
   * @memberof AddBook
   */
  constructor(props) {
    super(props);
    this.path = this.props.location.pathname;
    this.state = this.path.match(/^\/admin\/edit/) && this.props.book;
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
    return this.path.match(/^\/admin\/add/) ?
      this.props.addBook(this.state) :
      this.props.editBook(this.props.book.id, this.state)
        .then(() => this.props.history.push('/library'));
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
    const data = Object.assign({}, this.state);
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
    console.log(event.target.value);
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
    if (event.target.category.value) {
      this.props.addBookCategory(event.target.category.value);
      event.target.category.value = '';
    }
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of component
   * @memberof AddBook
   */
  render() {
    const text = this.path.match(/^\/admin\/edit/) ?
      'Edit Book Information' :
      'Add Book To Library';
    return (
      <div>
        <Header />
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
              <Row>

              </Row>
            </div>
          </Row>
        </main>
      </div>
    );
  }
}

AddBook.propTypes = {
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


const mapStateToProps = ({ bookReducer, notifications }) => ({
  book: bookReducer.currentBook,
  categories: bookReducer.categories,
  notifications,
});

export default connect(
  mapStateToProps,
  { addBook, addBookCategory, editBook, getBookCategories, fetchNotifications }
)(AddBook);
