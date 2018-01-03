import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-materialize';

import BookRow from './BookRow';

/**
 * displays a table of books
 *
 * @param {array} bookList        Array of books
 * @param {array} tableHeaders    array of table headers
 * @param {Function} borrowBook   callback function to borrow a book
 *
 * @return {JSX}                  JSX representation of component
 */
const BooksTable = (
  { bookList, tableHeaders, borrowBook }
) => {
  const books = bookList.length ? bookList.map(book =>
    (
      <BookRow
        key={book.id}
        {...book}
        onButtonClick={borrowBook}
      />
    )
  ) : null;
  const headers = tableHeaders.map(header =>
    <th key={header}>{header}</th>
  );
  return (
    <Table
      className="striped centered bordered z-depth-4 books-table"
    >
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {books}
      </tbody>
    </Table>
  );
};


BooksTable.propTypes = {
  borrowBook: PropTypes.func,
  bookList: PropTypes.array,
  tableHeaders: PropTypes.array.isRequired,
};

export default BooksTable;
