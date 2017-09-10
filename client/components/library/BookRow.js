import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';


const BookRow = ({ id, cover, title, authors, total, onClick }) => (
  <tr>
    <td>{cover || 'N/A'}</td>
    <td>{title}</td>
    <td>{authors}</td>
    <td>{total}</td>
    <td>
      <Button
        disabled={!total}
        waves='light'
        onClick={() => onClick(id)}
      >
        Borrow
      </Button>
    </td>
  </tr>
);


BookRow.propTypes = {
  id: PropTypes.number,
  authors: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
  onClick: PropTypes.func,
};

export default BookRow;
