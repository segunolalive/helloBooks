import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-materialize';

/*
  eslint-disable
*/

/**
 *
 */
const History = (props) => {
  const books = props.books.map(book =>
    (
      <tr key={book.id}>
        <td>{book.cover || 'N/A'}</td>
        <td>{book.title}</td>
        <td>{book.authors}</td>
        <td>{book.total}</td>
        <td>
          <Button
            disabled={!book.total}
            waves='light'
          >
            Borrow
          </Button>
        </td>
      </tr>
    )
  );
  const headers = props.head.map(header =>
    <th key={header}>{header}</th>
  );
  return (
    <Table
      className="striped centered bordered"
    >
      <thead>
        <tr>
          {header}
        </tr>
      </thead>
      <tbody>
        {books}
      </tbody>
    </Table>
  );
};


History.propTypes = {
  books: PropTypes.array.isRequired,
};

export default History;
