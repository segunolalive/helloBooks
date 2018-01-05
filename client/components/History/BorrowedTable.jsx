import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import requestImageUrl from '../../utils/requestImageUrl';


/**
 * Table of borrowed books
 *
 * @param {Object} props props object containing books
 *
 * @returns {JSX}        JSX representation of Books table
 */
const BorrowedTable = (props) => {
  const rows = props.books.length ? props.books.map((book) => {
    const returned = book.borrowedBook.returned;
    const bookImage = <img src={(book.cover &&
      requestImageUrl(book.cover, { width: 50 })) || BOOK_IMAGE_FALLBACK}
    alt={`${book.title} cover`} style={{ width: '50px' }}></img>;
    return (
      <tr key={book.id}>
        <td>{bookImage}
        </td>
        <td>{book.title || 'N/A'}</td>
        <td>{book.authors || 'N/A'}</td>
        <td>{moment(book.createdAt).format('LLLL') || 'N/A'}</td>
        <td>{returned ? 'Returned' : 'Unreturned'}</td>
      </tr>
    );
  }) : null;
  return (rows ?
    <div className="row">
      <div className="center" style={{ width: '95%', margin: 'auto' }}>
        <table className="centered bordered history-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Date Borrowed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div> :
    <div className="row">
      <div className="container">
        <h3 className="center bold-text" style={{ color: '#aaa' }}>
          You have no borrowing history. Head over to the library to get started
        </h3>
      </div>
    </div>
  );
};

BorrowedTable.propTypes = {
  books: PropTypes.array.isRequired,
};


export default BorrowedTable;
