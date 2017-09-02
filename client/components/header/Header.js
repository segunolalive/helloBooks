import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Logo from './Logo';
import toggleSidebar from './toggleSidebar';

/*
  eslint-disable
 */
class Header extends Component {
  componentDidMount() {
    toggleSidebar();
  }
  componentWillUnMount() {
    toggleSidebar();
  }
  render() {
    return (
      <header className="header">
        <nav className="transparent">
          <div className="nav-wrapper">
            <Logo />
            <Navigation
              activeLink={this.props.activeLink}
              className="right hide-on-small-and-down"
              navLinks={this.props.navLinks}
            />
            <Navigation
              id="slide-out"
              activeLink={this.props.activeLink}
              className="side-nav right-aligned"
              navLinks={this.props.navLinks}
            />
            <a href="#" data-activates="slide-out"
              className="button-collapse hide-on-med-and-up right">
              <i className="material-icons">more_vert</i>
            </a>
          </div>
        </nav>
      </header>
    );
  }
};

Header.propTypes = {
  activeLink: PropTypes.string,
  navLinks: PropTypes.array.isRequired,
};

export default Header;
