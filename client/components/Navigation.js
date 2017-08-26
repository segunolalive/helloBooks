import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 */
const Navigation = (props) => {
  const anchors = props.navLinks.map(link =>
    (
      <li key={link} className={props.active === link ? 'active' : ''}>
        <a
          href={`/${link.replace(' ', '')}`}
          onClick={event => props.onClick(event)}
        >
          {link.toUpperCase()}
        </a>
      </li>
    )
  );
  return (
    <ul className={props.className}>
      {anchors}
    </ul>
  );
};

Navigation.propTypes = {
  active: PropTypes.string,
  navLinks: PropTypes.array,
  className: PropTypes.string,
};

export default Navigation;
