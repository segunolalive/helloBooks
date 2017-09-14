import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';


const BookRow = ({ id, cover, title, authors, total, onTitleClick, onButtonClick }) => (
  <tr>
    <td>{cover || 'N/A'}</td>
    <td onClick={() => onTitleClick(id)}>
      <Link to='/library/book'>
        {title}
      </Link>
    </td>
    <td>{authors}</td>
    <td>{total}</td>
    <td>
      <Button
        disabled={!total}
        waves='light'
        onClick={() => onButtonClick(id)}
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
  onTitleClick: PropTypes.func,
  onButtonClick: PropTypes.func,
};

export default BookRow;
