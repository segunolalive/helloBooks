import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'react-materialize';


/**
 * 
 */
const Categories = (props) => {
  const options = props.categories.map(category => (
    category ?
      <option
        key={category.id}
        value={category.id}
      >
        {category.category}
      </option>
      : null
  ));
  return (
    <Col s={12} m={6}>
      <Input s={12}
        type='select'
        defaultValue=""
        onChange={e => props.onChange(e)}
      >
        <option value='' disabled>Filter By Category</option>
        {options}
      </Input>
    </Col>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default Categories;

