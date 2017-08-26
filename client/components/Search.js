import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input } from 'react-materialize';


/**
 * 
 */
const Search = (props =>
  (
    <Col s={12} m={6}>
      <Input s={12}
        type='search'
        label='Search Books'
        onChange={e => props.onChange(e)}
      >
      </Input>
    </Col>
  )
);

Search.propTypes = {
  onChange: PropTypes.func,
};

export default Search;
