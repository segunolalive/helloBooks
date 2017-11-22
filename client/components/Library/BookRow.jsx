import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import requestImageUrl from '../../utils/requestImageUrl';


/**
 * displays a table row of books
 * @param {object} props
 * @return {JSX} JSX element (table row)
 */
const BookRow = props => (
  <tr>
    <td>
      <img
        src={(props.cover && requestImageUrl(props.cover, { width: 50 })) ||
          'https://segunolalive.github.io/helloBooks/' +
          'templates/images/eloquentjs_cover.png'}
        alt={`${props.title} book cover`}
        style={{ width: '40px' }}
      >
      </img>
    </td>
    <td>
      <Link to={`/library/book/${props.id}`}>
        {props.title}
      </Link>
    </td>
    <td>{props.authors}</td>
    <td>{props.total}</td>
    <td>
      <Button
        disabled={!props.total}
        waves='light'
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
