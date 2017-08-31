import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-materialize';

import BookRow from './Bookrow';


/**
 *
 */
const BooksTable = ({ bookList, tableHeaders }) => {
  const books = bookList.map(book =>
    (
      <BookRow
        key={book.id}
        {...book}
      />
    )
  );
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
  bookList: PropTypes.array.isRequired,
  tableHeaders: PropTypes.array.isRequired,
};

export default BooksTable;
