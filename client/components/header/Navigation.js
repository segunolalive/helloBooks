import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/*
 eslint-disable
 */
const Navigation = (props) => {
  const links = props.navLinks.map(link =>
    (
      <li key={link}
        className={props.activeLink === link ? 'active' : ''}>
        <NavLink to={`/${link.replace(' ', '')}`}
          activeClassName="active"
        >
          {link.toUpperCase()}
        </NavLink>
      </li>
    )
  );
  return (
    <ul className={props.className}>
      {links}
    </ul>
  );
};

Navigation.propTypes = {
  activeLink: PropTypes.string,
  className: PropTypes.string,
  navLinks: PropTypes.array,
};

export default Navigation;
