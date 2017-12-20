import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'react-materialize';


/**
 * displays form for adding new book category
 *
 * @param {Object} props
 *
 * @returns {JSX} JSX representation of component
 */
const AddCategoryForm = props => (
  <div className={props.className}>
    <h5>Add New Category</h5>
    <form id="category-form" onSubmit={props.onSubmit}>
      <Input s={12}
        name="category"
        type="text"
        placeholder="category"
        id="category-input"
      >
      </Input>
      <Button waves="light" id="add-category-btn">Add</Button>
    </form>
  </div>
);

AddCategoryForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default AddCategoryForm;
