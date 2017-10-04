import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-materialize';

import { addBook, addBookCategory, editBook } from '../../actions/adminActions';
import { fetchNotifications } from '../../actions/notifications';
import { getBookCategories } from '../../actions/library';

import Header from '../header/Header';
import BookForm from './BookForm';
import Notifications from './Notifications';
import AddCategoryForm from './CategoryForm';

/*
eslint-disable
 */
class Admin extends Component {
  constructor(props) {
    super(props);
    this.shouldEdit = this.props.location.pathname.match(/^\/admin\/edit/);
    this.state = this.shouldEdit ? {
      title: this.props.book.title || '',
      authors: this.props.book.authors || '',
      description: this.props.book.description || '',
      category: this.props.book.category || '',
      total: this.props.book.total || '',
      cover: this.props.book.cover || '',
      bookFile: this.props.book.bookFile || '',
    } : {
      title: '',
      authors: '',
      description: '',
      category: '',
      total: '',
      cover: '',
      bookFile: '',
    };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }
  componentDidMount () {
    this.props.getBookCategories();
    this.props.fetchNotifications();
  }

  handleFormSubmission (event) {
    event.preventDefault();
    this.shouldEdit ?
    this.props.editBook(this.props.book.id, this.state)
      .then(() => this.props.history.push('/library')) :
    this.props.addBook(this.state);
    this.setState(() => ({
      title: '',
      description: '',
      category: '',
      total: '',
      cover: '',
      bookFile: '',
    }));
  }

  handleFieldChange (event) {
    event.preventDefault();
    const formField = event.target.name;
    const data = Object.assign({}, this.state);
    if (!!event.target.value.trim()) {
      data[formField] = event.target.value.trim();
    }
    this.setState(() => data);
  }

  handleSelectCategory (event) {
    this.setState(() => { category: event.target.value });
  }

  handleAddCategory (event) {
    event.preventDefault();
    const category = event.target.category.value.trim()
    if (!!category) {
      this.props.addBookCategory(category);
      event.target.category.value ='';
    }
    this.props.getBookCategories();
  }

  render() {
    const text = this.shouldEdit ?
      'Edit Book Information' :
      'Add Book To Library';
    return ( this.props.user && this.props.user.isAdmin ?
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
            </div>
          </Row>
        </main>
      </div> : <Redirect to='/dashboard' />
    );
  }
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
