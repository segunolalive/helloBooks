import React from 'react';
import PropTypes from 'prop-types';


/**
 * displays a search Input
 *
 * @param {Object} props react props
 *
 * @returns {JSX} JSX representation of component
 */
const Search = props => (
  <div className={`${props.className} z-depth-3 bottom-10 search-wrapper`}>
    <form onSubmit={event => props.onSubmit(event)}>
      <div className="input-field col s9">
        <input className="col s12"
          name="search"
          type="search"
          placeholder="Search Books"
          onChange={event => props.onChange(event)}
        />
      </div>
      <div
        className="col s3 search-btn-wrapper waves-effect waves-light"
        onClick={event => props.onClick(event)}
      >
        <button
          className="btn search-btn"
          type="submit"
        >
          <i className="material-icons">search</i>
        </button>
      </div>
    </form>
  </div>
);

Search.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default Search;
