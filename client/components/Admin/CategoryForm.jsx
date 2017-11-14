import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'react-materialize';


/**
 * displays form for adding new book category
 * @param {Object} props
 * @returns {JSX} JSX representation of component
 */
const AddCategoryForm = props => (
  <div className={props.className}>
    <h5>Add New Category</h5>
    <form onSubmit={props.onSubmit}>
      <Input s={12}
        name="category"
        type="text"
        defaultValue=""
        placeholder="category"
      >
      </Input>
      <Button waves="light">Add</Button>
    </form>
  </div>
);

AddCategoryForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default AddCategoryForm;
