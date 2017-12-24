import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

/**
 * drop-down select for categories
 *
 * @param {Object} props
 *
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
    <div className={`${props.className} z-depth-3 bottom-10 filter-dropdown`}>
      <Input s={12}
        type='select'
        defaultValue=''
        onChange={event => props.onChange(event)}
      >
        <option value='' disabled>{props.text}</option>
        <option value={props.indexVal || null}>
          {props.indexText || 'none'}
        </option>
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
  indexVal: PropTypes.number,
  indexText: PropTypes.string,
};

export default Categories;
