import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/**
 * navigation links
 *
 * @param {Object} props properties that define the navigation links
 *
 * @returns {JSX}        JSX representation of navigation
 */
const Navigation = (props) => {
  const links = props.navLinks.map(link =>
    (
      <li key={link}
        className={props.activeLink === link ? 'active' : ''}>
        <NavLink
          to={`/${link.replace(' ', '')}`}
          id={`${link.replace(' ', '')}-nav-link`}
          activeClassName="active"
        >
          {link.toUpperCase()}
        </NavLink>
      </li>
    )
  );
  return (
    <ul
      id={props.id}
      className={props.className}
    >
      {links}
    </ul>
  );
};

Navigation.propTypes = {
  id: PropTypes.string,
  activeLink: PropTypes.string,
  className: PropTypes.string,
  navLinks: PropTypes.array,
};

export default Navigation;
