import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../header/Header';
import { borrowBook, deleteBook } from '../../actions/library';


/*
eslint-disable
 */
class BookDetail extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleBorrow = this.handleBorrow.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleBorrow() {
    this.props.borrowBook(this.props.userId, this.props.book.id)
  }
  handleEditClick () {
    this.setState({ editRedirect: true });
  }
  handleDelete () {
    this.props.deleteBook(this.props.book.id)
      .then((response) => {
        Materialize.toast(response.data.message, 2500, 'teal darken-4');
        this.setState({ deleteRedirect: true });
      }, (error) => {
        Materialize.toast(error.response.data.message, 2500, 'red darken-4');
      })
      .catch((error) => {
        Materialize.toast(error, 2500, 'red darken-4');
      })
  }

  render () {
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
    const redirectToEditPage = this.state.editRedirect;
    const redirectToLibrary = this.state.deleteRedirect;
      return(
        redirectToEditPage ? <Redirect to='/admin/edit'/> :
        redirectToLibrary ? <Redirect to='/library'/> :
      <div>
        <Header
          navLinks={['dashboard', 'history', 'library']}
          activeLink='library'
        />
        <section className="col m6 book-detail">
          <div className="row">
            <div className="col s12 m4 book-info">
              <div className="card">
                <div className="card-image">
                  <img src={this.props.book.cover || 'https://segunolalive.github.io/helloBooks/templates/images/eloquentjs_cover.png'} />
                </div>
                {actionButtons}
              </div>
            </div>
            <div className="col s12 m6 offset-m1">
              <div className="center">
                <h4>{this.props.book.title || ''}</h4>
                <h6>{this.props.book.shortDescription || ''}</h6>
              </div>
              <div className="">
                <p>
                  {this.props.book.description || ''}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

BookDetail.propTypes = {
  userId: PropTypes.number,
  book: PropTypes.object,
  borrowBook: PropTypes.func,
};

const mapStateToProps = ({ authReducer, bookReducer }) => ({
  userId: authReducer.user && authReducer.user.id,
  isAdmin: authReducer.user && authReducer.user.isAdmin,
  book: bookReducer.currentBook,
});

// const mapDispatchToProps = dispatch => bindActionCreators({ borrowBook }, dispatch);

export default connect(mapStateToProps, { borrowBook, deleteBook })(BookDetail);
