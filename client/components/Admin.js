import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';

import { addBook, editBook } from '../actions/adminActions';
import { getBookCategories } from '../actions/library';

import Header from './header/Header';
import BookForm from './BookForm';

// import jQuerySelect from '../static/jquery/select';

/*
eslint-disable
 */
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.path = this.props.location.pathname;
    this.state = this.path.match(/^\/admin\/edit/) && this.props.book;
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }
  componentDidMount () {
    this.props.getBookCategories();
  }

  handleFormSubmission (event) {
    event.preventDefault();
    this.path.match(/^\/admin\/add/) ?
    this.props.addBook(this.state) :
    this.props.editBook(this.props.book.id, this.state)
      .then(() => this.props.history.push('/library'));
  }

  handleFieldChange (event) {
    const formField = event.target.name;
    const data = Object.assign({}, this.state);
    if (!!event.target.value.trim()) {
      data[formField] = event.target.value.trim();
    }
    this.setState(() => data);
  }
  handleChange (event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = Object.assign({}, this.state);
    if (!!event.target.value.trim()) {
      user[formField] = event.target.value.trim();
    }
    this.setState(() => user);
  }

  handleSelectCategory (event) {
    console.log(event.target.value);
    console.log('category selected');
  }

  render() {
    const text = this.path.match(/^\/admin\/add/) ? 'Add Book To Library' : 'Edit Book Information';
    return (
      <div>
        <Header />
        <main>
          <Row>
            <div className="container">
              <div className="col s12 m6 admin-form center">
                <BookForm
                  heading={text}
                  book={this.state}
                  categories={this.props.categories}
                  onSelectCategory={this.handleSelectCategory}
                  onChange={this.handleFieldChange}
                  onSubmit={this.handleFormSubmission}
                />
              </div>
              <div className="col s12 m6 center">
                <h5 className="">Create New Book Category</h5>
              </div>
            </div>
          </Row>
        </main>
      </div>
    );
  }
};

const mapStateToProps = ({ bookReducer }) => ({
  book: bookReducer.currentBook,
  categories: bookReducer.categories,
});

export default connect(
  mapStateToProps,
  { addBook, editBook, getBookCategories }
)(AddBook);
