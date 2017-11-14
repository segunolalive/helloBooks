import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import { borrowBook } from '../../actions/library';
import { deleteBook } from '../../actions/adminActions';
import { viewBookDetails } from '../../actions/viewBook';

const Materialize = window.Materialize;

/**
 * displays book details
 *
 * @class BookDetail
 * @extends {Component}
 */
class BookDetail extends Component {
  /**
   * Creates an instance of BookDetail.
   * @param {any} props
   * @memberof BookDetail
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBorrow = this.handleBorrow.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  /**
   * lifecycle hook invoked once component is mounted to DOM
   *
   * @memberof BookDetail
   * @returns {Undefined} shows book details
   */
  componentDidMount() {
    this.props.viewBookDetails(this.props.match.params.id);
  }

  /**
   * handler for button click for borrowing books
   *
   * @memberof BookDetail
   * @returns {Undefined} sends request to borrow book
   */
  handleBorrow() {
    this.props.borrowBook(this.props.userId, this.props.book.id);
  }

  /**
   * handler for edit button clcik
   *
   * @memberof BookDetail
   * @returns {Undefined} redirects to edit book page
   */
  handleEditClick() {
    this.setState({ editRedirect: true });
  }
  /**
   * handler for delete book button click
   * @memberof BookDetail
   * @returns {Undefined} deletes a book from library
   */
  handleDelete() {
    this.props.deleteBook(this.props.book.id)
      .then((response) => {
        Materialize.toast(response.data.message, 2500, 'teal darken-4');
        this.setState({ deleteRedirect: true });
      }, (error) => {
        Materialize.toast(error.response.data.message, 2500, 'red darken-4');
      })
      .catch((error) => {
        Materialize.toast(error, 2500, 'red darken-4');
      });
  }

  /**
   * handles redirect after button click
   * @memberof BookDetail
   * @returns {JSX | null} react-router-dom redirect element or null
   */
  handleRedirect() {
    if (this.state.editRedirect) {
      return <Redirect to='/admin/edit' />;
    } else if (this.state.deleteRedirect) {
      return <Redirect to='/library' />;
    }
    return null;
  }

  /**
   * renders component to DOM
   * @returns {JSX} JSX representation of DOM
   * @memberof BookDetail
   */
  render() {
    const actionButtons = this.props.isAdmin ? (
      <div className="card-action">
        <Button
          className="teal darken-4 action-btn"
          waves="light"
          onClick={this.handleEditClick}
        >
          Edit
        </Button>
        <Button
          className="red darken-4 action-btn"
          waves="light"
          onClick={this.handleDelete}
        >
          Delete
        </Button>
      </div>
    ) : (
      <div className="card-action">
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
                    'https://segunolalive.github.io/helloBooks/templates/images/eloquentjs_cover.png')
                      }
                      />
                    </div>
                    {actionButtons}
                  </div>
                </div>
                <div className="col s12 m6 offset-m1">
                  <div className="center">
                    <h4>{this.props.book && (this.props.book.title || '')}</h4>
                  </div>
                  <div className="">
                    <p>
                      {this.props.book && (this.props.book.description || '')}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
    );
  }
}

BookDetail.propTypes = {
  userId: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,
  book: PropTypes.object.isRequired,
  borrowBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  viewBookDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  userId: authReducer.user && authReducer.user.id,
  isAdmin: authReducer.user && authReducer.user.isAdmin,
  book: bookReducer.currentBook,
});


export default connect(
  mapStateToProps, {
    borrowBook,
    deleteBook,
    viewBookDetails,
  })(BookDetail);
