import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

/**
 * drop-down select for categories
 * @param {object} props
 * @returns {JSX} JSX representation of component
 */
const Categories = (props) => {
  const options = props.categories && props.categories.map(category => (
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
