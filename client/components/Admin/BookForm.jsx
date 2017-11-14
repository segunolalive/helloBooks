import React from 'react';
import PropTypes from 'prop-types';

import Categories from '../Library/Categories';

/**
 * for for adding or editing books
 * @param {object} props
 * @returns {JSX} JSX representation of component
 */
const BookForm = (props) => {
  const categories = props.categories ?
    <Categories
      text='Select Book Category'
      categories={props.categories}
      onChange={props.onSelectCategory}
    /> : null;
  return (
    <div>
      <h5>{props.heading}</h5>
      <form className="" action=""
        method="post"
        encType="multipart/form-data"
      >
        <div className="input-field">
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={props.book ? props.book.title : ''}
            placeholder="Book Title"
            onChange={event => props.onChange(event)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="authors"
            defaultValue={props.book ? props.book.authors : ''}
            placeholder="Authors (comma separated for multiple)"
            onChange={event => props.onChange(event)}
          />
        </div>
        <div className="input-field">
          <textarea name="description"
            defaultValue={props.book ? props.book.description : ''}
            rows="20"
            placeholder="Book Description"
            onChange={event => props.onChange(event)}
          />
        </div>
        {categories}
        <hr style={{ visibility: 'hidden' }}/>
        <div className="input-field">
          <input
            type="number"
            name="total"
            min="0"
            value={props.book && (props.book.total || 0)}
            placeholder="Number available"
            onChange={event => props.onChange(event)}
          />
        </div>
        <div className="">
          <div className="file-field input-field">
            <div className="btn">
              <span>Browse</span>
              <input
                type="file"
                name="cvover"
                accept="image/jpeg image/x-png"
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                name="bookFile"
                type="text"
                placeholder="Upload Book Cover"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="file-field input-field">
            <div className="btn">
              <span>Browse</span>
              <input
                type="file"
                accept="application/pdf"
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload Book file"
              />
            </div>
          </div>
        </div>
        <div style={ { paddingTop: '10px' } }>
          <input
            type="submit"
            className="btn center"
            onClick={props.onSubmit}
          >
          </input>
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  categories: PropTypes.array,
  heading: PropTypes.string,
  book: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default BookForm;
