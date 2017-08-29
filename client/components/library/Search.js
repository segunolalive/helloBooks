import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Icon } from 'react-materialize';


/**
 *
 */
const Search = props =>
  (
    <Col s={10} m={6}>
      <Input s={12} className="icon-prefix"
        type='search'
        label={'Search Books'}
        onChange={e => props.onChange(e)}
      >
      </Input>
    </Col>
  );

Search.propTypes = {
  onChange: PropTypes.func,
};

export default Search;
