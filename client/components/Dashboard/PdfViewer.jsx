import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PDF from 'react-pdf-js';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import LoginRedirect from '../auth/LoginRedirect';
import Loading from '../common/Loading';
import Notify from '../../actions/Notify';

/**
 * custom pdf viewer
 *
 * @export
 *
 * @class PdfViewer
 *
 * @extends {Component}
 */
export class PdfViewer extends Component {
  state = {};
  /**
   * method called when pdf file is completely fetched
   *
   * @param  {integer} pages   total number of pages in file
   *
   * @return {undefined}       sets state
   */
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  /**
   * method called when page is loaded
   *
   * @param  {integer} page   current page
   *
   * @return {undefined}       sets state
   */
  onPageComplete = (page) => {
    this.setState({ page });
  }

  /**
   * document error handler
   *
   * @param {Object}  error
   *
   * @return {JSX}          react-router-dom rea=direct component
   */
  onDocumentError = () => {
    Notify.error('An error occured while fetching book. Try again later');
    this.setState(() => ({ fileError: true }));
  }

  /**
   * navigates to previous page
   *
   * @memberof PdfViewer
   *
   * @return {undefined}       sets state
   */
  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  /**
   * navigates to next page
   *
   * @memberof PdfViewer
   *
   * @return {undefined}       sets state
   */
  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  /**
   * navigates to specific page
   *
   * @memberof PdfViewer
   *
   * @param {Object} event
   *
   * @return {undefined}       sets state
   */
  setPage = (event) => {
    const entry = Number(event.target.value);
    let currentPage = entry < 1 ? 1 : entry;
    currentPage = entry > this.state.pages ? this.state.pages : entry;
    this.setState({ page: currentPage });
  }

  /**
   * @param {integer}  page
   *
   * @param {integer}  pages
   *
   * @return {JSX}     JSX representation of page navigation
   *
   * @memberof PdfViewer
   */
  renderPagination = (page, pages) => {
    const previousButton = <button
      className="col s5 prev-btn"
      disabled={page === 1}
      onClick={this.handlePrevious}
    >
      <a href="#">
        <span>{page > 1 && 'Previous'}</span>
      </a>
    </button>;
    const nextButton = <button
      className="col s5 next-btn"
      disabled={page === pages}
      onClick={this.handleNext}
    >
      <a href="#">
        <span>{page < pages && 'Next'}</span>
      </a>
    </button>;
    const pageEntry = <div className="col s2 center">
      <input
        className="page-num center"
        type="number"
        value={this.state.page}
        onChange={this.setPage}
        min={1}
        max={this.state.pages}
      />
    </div>;
    return (
      <nav className="center black pdf-nav row">
        <ul className="container">
          {previousButton}
          {pageEntry}
          {nextButton}
        </ul>
      </nav>
    );
  }

  renderPdf = () => {
    const loader = <div className="row">
      <div className="col m6 offset-m3">
        <Loading text='loading pdf . . .' />
      </div>
    </div>;
    const pagination = (this.state.pages) ?
      this.renderPagination(this.state.page, this.state.pages) :
      null;
    return (
      this.props.isLoggedIn ?
        <div>
          <Header />
          {!this.props.bookUrl &&
            <div className="center">
              <h6>Your book was not found. Enjoy our all time favourite</h6>
            </div>}
          <div className="pdf-container">
            <PDF
              file={this.props.bookUrl || BOOK_FALLBACK}
              fillWidth
              loading={loader}
              onDocumentComplete={this.onDocumentComplete}
              onPageComplete={this.onPageComplete}
              page={this.state.page}
              onDocumentError={this.onDocumentError}
            />
            {pagination}
          </div>
        </div> : <LoginRedirect />
    );
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of component
   *
   * @memberof PdfViewer
   */
  render() {
    return this.state.fileError ?
      <Redirect to="/dashboard" /> :
      this.renderPdf();
  }
}


PdfViewer.propTypes = {
  bookUrl: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = ({ authReducer, bookReducer }) => ({
  bookUrl: bookReducer.bookToRead,
  isLoggedIn: authReducer.isLoggedIn,
});

export default connect(mapDispatchToProps)(PdfViewer);
