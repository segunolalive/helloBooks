import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import requestImageUrl from '../../utils/requestImageUrl';


/**
 * displays a table row of books
 *
 * @param {Object} props
 *
 * @return {JSX} JSX element (table row)
 */
const BookRow = props => (
  <tr id={`row-${props.id}`}>
    <td>
      <img
        src={(props.cover &&
          requestImageUrl(props.cover, { width: 80 })) ||
          BOOK_IMAGE_FALLBACK }
        alt={`${props.title} book cover`}
        style={{ maxWidth: '80px' }}
      >
      </img>
    </td>
    <td>
      <Link to={`/library/book/${props.id}`} id={`book-${props.id}-link`}>
        {props.title}
      </Link>
    </td>
    <td>{props.authors}</td>
    <td>{props.total}</td>
    <td>
      <Button
        disabled={!props.total}
        waves="light"
        className="borrow-book-btn"
        id={`borrow-book-${props.id}-btn`}
        onClick={() => props.onButtonClick(props.id)}
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
  onButtonClick: PropTypes.func,
};

export default BookRow;
