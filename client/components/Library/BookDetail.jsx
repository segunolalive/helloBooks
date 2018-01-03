import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import Modal from '../common/Modal';
import { borrowBook } from '../../actions/bookActions/library';
import { deleteBook } from '../../actions/adminActions/books';
import { viewBookDetails } from '../../actions/bookActions/viewBook';

/**
 * displays book details
 *
 * @class BookDetail
 *
 * @extends {Component}
 */
export class BookDetail extends Component {
  state = {}

  /**
   * lifecycle hook invoked once component is mounted to DOM
   *
   * @memberof BookDetail
   *
   * @returns {undefined} shows book details
   */
  componentDidMount() {
    this.props.viewBookDetails(this.props.match.params.id);
  }

  /**
   * handler for button click for borrowing books
   *
   * @memberof BookDetail
   *
   * @returns {undefined} sends request to borrow book
   */
  handleBorrow = () => {
    this.props.borrowBook(this.props.userId, this.props.book.id);
  }

  /**
   * handler for edit button clcik
   *
   * @memberof BookDetail
   *
   * @returns {undefined} redirects to edit book page
   */
  handleEditClick= () => {
    this.setState({ editRedirect: true });
  }
  /**
   * handler for delete book button click
   *
   * @memberof BookDetail
   *
   * @returns {undefined} deletes a book from library
   */
  handleDelete = () => {
    this.props.deleteBook(this.props.book.id)
      .then(() => this.setState({ deleteRedirect: true }));
  }

  /**
   * handles redirect after button click
   *
   * @memberof BookDetail
   *
   * @returns {JSX | null} react-router-dom redirect element or null
   */
  handleRedirect = () => {
    if (this.state.editRedirect) {
      return <Redirect to='/admin/edit' />;
    } else if (this.state.deleteRedirect) {
      return <Redirect to='/library' />;
    }
    return null;
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of DOM
   *
   * @memberof BookDetail
   */
  render() {
    const actionButtons = this.props.isAdmin ? (
      <div className="card-action">
        <Button
          className="teal darken-4 action-btn edit-btn"
          waves="light"
          onClick={this.handleEditClick}
        >
          Edit
        </Button>
        <Button
          data-target="confirm-modal"
          className="red darken-4 action-btn delete-btn"
          waves="light"
        >
          Delete
        </Button>
      </div>
    ) : (
      <div className="card-action borrow-btn">
        <Button
          waves="light"
          onClick={this.handleBorrow}
        >
          Borrow
        </Button>
      </div>
    );
    return (
      this.handleRedirect() ||
          <div>
            <Header
              activeLink='library'
            />
            <section className="col m6 book-detail">
              <div className="row">
                <div className="col s12 m4 book-info">
                  <div className="card">
                    <div className="card-image">
                      <img src={
                        this.props.book && (this.props.book.cover ||
                        BOOK_IMAGE_FALLBACK)}
                      />
                    </div>
                    {actionButtons}
                  </div>
                </div>
                <div className="col s12 m6 offset-m1">
                  <div className="center">
                    <h4>{this.props.book && (this.props.book.title || '')}</h4>
                  </div>
                  <div>
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {this.props.book && (this.props.book.description || '')}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <Modal
              title="Confirm Delete"
              question={
                `Are you sure you want to delete ${this.props.book &&
                  this.props.book.title}?`}
              subText='This action cannot be reversed'
              confirmText="Yes, Delete"
              cancelText="No, cancel"
              confirmColor="red"
              cancelColor="teal"
              modalAction={this.handleDelete}
            />
          </div>
    );
  }
}

BookDetail.propTypes = {
  userId: PropTypes.number,
  isAdmin: PropTypes.bool,
  book: PropTypes.object.isRequired,
  borrowBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  viewBookDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  userId: authReducer.user.id,
  isAdmin: authReducer.user.isAdmin,
  book: bookReducer.currentBook,
});


export default connect(
  mapStateToProps, {
    borrowBook,
    deleteBook,
    viewBookDetails,
  })(BookDetail);
