import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-materialize';

import BookRow from './BookRow';


/*

 */
const BooksTable = (
  { bookList, tableHeaders, borrowBook, viewBookDetails }
) => {
  const books = bookList ? bookList.map(book =>
    (
      <BookRow
        key={book.id}
        {...book}
        onTitleClick={viewBookDetails}
        onButtonClick={borrowBook}
      />
    )
  ) : null;
  const headers = tableHeaders.map(header =>
    <th key={header}>{header}</th>
  );
  return (
    <Table
      className="striped centered bordered"
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
  viewBookDetails: PropTypes.func,
  bookList: PropTypes.array,
  tableHeaders: PropTypes.array.isRequired,
};

export default BooksTable;
