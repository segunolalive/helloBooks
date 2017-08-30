import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';


const BookRow = ({ cover, title, authors, total }) => (
  <tr>
    <td>{cover || 'N/A'}</td>
    <td>{title}</td>
    <td>{authors}</td>
    <td>{total}</td>
    <td>
      <Button
        disabled={!total}
        waves='light'
      >
        Borrow
      </Button>
    </td>
  </tr>
);


BookRow.propTypes = {
  authors: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default BookRow;
