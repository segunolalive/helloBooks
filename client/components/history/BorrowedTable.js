import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from 'react-materialize';

const BorrowedTable = (props) => {
  const rows = props.books && props.books.length ? props.books.map((book) => {
    const returned = book.BorrowedBook.returned;
    return (
      <tr key={book.id}>
        <td>{book.cover || 'N/A'}</td>
        <td>{book.title || 'N/A'}</td>
        <td>{book.authors || 'N/A'}</td>
        <td>{moment(book.createdAt).format('LLLL') || 'N/A'}</td>
        <td>{returned ? 'Returned' : 'Pending'}</td>
        <td>
          <Button
            style={{ margin: '10px' }}
            disabled={returned }
            waves='light'
            onClick={() => props.returnBook(book.id)}
          >
          Return
          </Button>
          <Button
            disabled={returned }
            waves='light'
            onClick={() => props.readBook(book.id)}
          >
          Read
          </Button>
        </td>
      </tr>
    );
  }) : null;
  return (rows ?
    <table className="centered bordered" style={{ margin: '30px' }}>
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>Authors</th>
          <th>Date Borrowed</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table> : null
  );
};

BorrowedTable.propTypes = {
  books: PropTypes.array.isRequired,
};


export default BorrowedTable;
