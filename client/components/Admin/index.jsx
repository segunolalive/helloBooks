import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-materialize';
import InfiniteScroll from 'react-infinite-scroller';

import { addBook, addBookCategory, editBook } from '../../actions/adminActions';
import uploadFile from '../../actions/uploadFile';
import { fetchNotifications } from '../../actions/notifications';
import { getBookCategories } from '../../actions/library';

import Header from '../Header';
import BookForm from './BookForm';
import Notifications from './Notifications';
import AddCategoryForm from './CategoryForm';
import Loading from '../common/Loading';

import { hasMore, getOffset } from '../../utils/paginationUtils';

/**
 * adds or edits book
 *
 * @class Admin
 * @extends {Component}
 */
class Admin extends Component {
  /**
   * Creates an instance of AddBook.
   * @param {object} props
   * @memberof AddBook
   */
  constructor(props) {
    super(props);
    this.shouldEdit = this.props.location.pathname.match(/^\/admin\/edit/);
    this.state = { hasMore: false, errors: {} };
    this.state.book = this.shouldEdit ? {
      title: this.props.book.title || '',
      authors: this.props.book.authors || '',
      description: this.props.book.description || '',
      categoryId: this.props.book.categoryId || 0,
      total: this.props.book.total || 0,
      cover: this.props.book.cover || '',
      bookFile: this.props.book.bookFile || '',
    } : {
      title: '',
      authors: '',
      description: '',
      categoryId: 0,
      total: 0,
      cover: '',
      bookFile: '',
    };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleFetchNotifications = this.handleFetchNotifications.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  /**
   * lifecycle methods called after component mounts the DOM
   * @memberof AddBook
   * @returns {undefined} fetches book categories and admin notifications
   */
  componentDidMount() {
    this.props.getBookCategories();
    const { pageSize, pageNumber } = this.props.pagination;
    const offset = getOffset.bind(this)(pageNumber, pageSize);
    return this.props.fetchNotifications({ limit: 12, offset });
  }

  /**
   * called when component receives new propTypes
   * @param  {Object} nextProps
   * @return {undefined}        calls set setState
   */
  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      hasMore: hasMore(this.props.pagination, nextProps.pagination)
    }));
  }

  /**
   * form submission handler
   *
   * @param {object} event
   * @memberof AddBook
   * @returns {undefined} submits form
   */
  handleFormSubmission(event) {
    event.preventDefault();
    if (this.shouldEdit) {
      this.props.editBook(this.props.book.id, this.state.book)
        .then(() => this.props.history.push('/library'));
    } else {
      this.props.addBook(this.state.book)
        .then(() => (
          this.setState(() => ({
            book: {
              title: '',
              authors: '',
              description: '',
              categoryId: 0,
              total: 0,
              cover: '',
              bookFile: '',
            }
          }))
        ));
    }
  }

  /**
   * updates component state when form values (except select field) change
   *
   * @param {object} event
   * @memberof AddBook
   * @returns {undefined} calls setState
   */
  handleFieldChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const data = { ...this.state.book };
    data[formField] = event.target.value;
    this.setState(() => ({ book: data }));
  }

  /**
   * handles image Upload
   * @param  {object} event
   * @return {undefined}    sets state
   */
  handleImageChange(event) {
    event.preventDefault();
    const cover = event.target.files[0];
    this.setState(() => ({ cover, book: { ...this.state.book, cover: '' } }));
    this.props.uploadFile(cover)
      .end((error, response) => {
        if (error) {
          return this.setState(() => ({
            errors: {
              ...this.state.errors,
              cover: response.body.error.message
            },
            cover: null,
            book: { ...this.state.book, cover: '' },
          }));
        }
        this.setState({
          book: { ...this.state.book, cover: response.body.secure_url },
          cover: null,
        });
      });
  }

  /**
   * handles book file upload
   * @param  {Object} event
   * @return {Function}     calls setState
   */
  handleFileChange(event) {
    event.preventDefault();
    const bookFile = event.target.files[0];
    this.setState(() => ({ bookFile }));
    this.props.uploadFile(bookFile)
      .end((error, response) => {
        if (error) {
          return this.setState(() => ({
            errors: {
              ...this.state.errors,
              bookFile: response.body.error.message
            },
            bookFile: null,
            book: { ...this.state.book, bookFile: '' },
          }));
        }
        return this.setState({
          book: { ...this.state.book, bookFile: response.body.secure_url },
          bookFile: null,
        });
      });
  }

  /**
   * handles selection of book category
   *
   * @param {object} event
   * @memberof AddBook
   * @returns {Function} calls setState
   */
  handleSelectCategory(event) {
    return this.setState(() => ({
      book: { ...this.state.book, categoryId: event.target.value }
    }));
  }

  /**
   * handles adding a new category
   *
   * @param {object} event
   * @memberof AddBook
   * @returns {undefined} updates list of categories
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
   * handles fetching of Notifications
   * @return {thunk} returns a redux thunk
   */
  handleFetchNotifications() {
    const { pageSize, pageNumber } = this.props.pagination;
    const offset = getOffset.bind(this)(pageNumber, pageSize);
    return this.props.fetchNotifications({ offset, limit: 6 });
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of component
   * @memberof AddBook
   */
  render() {
    const imageUploading = this.state.cover && !this.state.book.cover;
    console.log(imageUploading);
    const imageUploaded = this.state.cover === null && this.state.book.cover;
    const bookFileUploading = this.state.bookFile && !this.state.book.bookFile;
    const bookFileUploaded = this.state.bookFile === null &&
      this.state.book.bookFile;
    const { pageCount, pageNumber } = this.props.pagination;
    const reachedEnd = pageNumber >= pageCount;
    const endMessage = reachedEnd ?
      <p className="center" style={{ fontWeight: 900, color: '#ffffff' }}>
        End of notifications
      </p> :
      <Loading text="fetching more notifications . . ." />;
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
                      book={this.state.book}
                      categories={this.props.categories}
                      onSelectCategory={this.handleSelectCategory}
                      onChange={this.handleFieldChange}
                      onBookConverChange={this.handleImageChange}
                      onSubmit={this.handleFormSubmission}
                      imageUploading={imageUploading}
                      imageUploaded={imageUploaded}
                      imageError={this.state.errors.image}
                      bookFileUploading={bookFileUploading}
                      bookFileUploaded={bookFileUploaded}
                      onBookFileChange={this.handleFileChange}
                      bookFileError={this.state.errors.bookFile}
                    />
                  </div>
                  <div className="col s12 admin-form center">
                    <AddCategoryForm
                      onSubmit={this.handleAddCategory}
                    />
                  </div>
                </Col>
                <div className="col s12 m5 offset-m1 admin-form">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.handleFetchNotifications}
                    hasMore={this.state.hasMore}
                  >
                    <h5 className="center">Notifications</h5>
                    <Notifications notifications={this.props.notifications}/>
                  </InfiniteScroll>
                  {endMessage}
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
  pagination: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
};


const mapStateToProps = ({
  authReducer,
  bookReducer,
  notificationReducer }) => ({
  user: authReducer.user,
  book: bookReducer.currentBook,
  categories: bookReducer.categories,
  notifications: notificationReducer.notifications,
  pagination: notificationReducer.pagination,
});

const mapDispatchToProps = {
  addBook,
  addBookCategory,
  editBook,
  getBookCategories,
  fetchNotifications,
  uploadFile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
