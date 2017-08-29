import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Logo from './Logo';

/**
 *
 */
const Header = props => (
  <header className='header'>
    <nav className='transparent'>
      <div className='nav-wrapper'>
        <Logo />
        <Navigation
          activeLink={props.activeLink}
          className='right hide-on-small-and-down'
          navLinks={props.navLinks}
        />
        <Navigation
          id='slide-out'
          activeLink={props.activeLink}
          className='side-nav'
          navLinks={props.navLinks}
        />
        <a href="#" data-activates="slide-out"
          className="button-collapse hide-on-med-and-up right">
          <i className="material-icons">more_vert</i>
        </a>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  activeLink: PropTypes.string,
  navLinks: PropTypes.array.isRequired,
};

export default Header;
