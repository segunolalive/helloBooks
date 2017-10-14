import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';


/*
 *
 */
const Categories = (props) => {
  const options = props.categories && props.categories.map(category => (
    category ?
      <option
        key={category.id}
        value={category.category}
      >
        {category.category}
      </option>
      : null
  ));
  return (
    <div className={props.className}>
      <Input s={12}
        type='select'
        defaultValue=''
        onChange={event => props.onChange(event)}
      >
        <option value='' disabled>{props.text}</option>
        {options}
      </Input>
    </div>
  );
};

Categories.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  categories: PropTypes.array,
  onChange: PropTypes.func,
};

export default Categories;
