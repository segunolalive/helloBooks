import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './Navigation.jsx';
import Logo from './Logo.jsx';
import toggleSidebar from './toggleSidebar';

/**
 * Component for header and navigation
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   * component lifecycle hook
   * @memberof Header
   * @return {Undefined} - initializes DOM manipulation utility(toggleSidebar)
   */
  componentDidMount() {
    toggleSidebar();
  }

  /**
   * component lifecycle hook
   * @memberof Header
   * @return {Undefined} - cleans up DOM manipulation utility(toggleSidebar)
   */
  componentWillUnMount() {
    toggleSidebar();
  }

  /**
   * renders JSX representation of component
   * @memberof Header
   * @return {JSX} JSX reoprresentation of header and navigation
   */
  render() {
    let navLinks = ['library'];
    navLinks = this.props.isLoggedIn ?
      ['dashboard', ...navLinks, 'history', 'logout'] :
      ['login', 'sign up', ...navLinks];

    if (this.props.user && this.props.user.isAdmin) {
      navLinks = ['admin', ...navLinks];
    }

    return (
      <header className="header navbar-fixed">
        <nav className="transparent navbar-blue">
          <div className="nav-wrapper">
            <Logo />
            <Navigation
              activeLink={this.props.activeLink}
              className="right hide-on-small-and-down"
              navLinks={navLinks}
            />
            <Navigation
              id="slide-out"
              activeLink={this.props.activeLink}
              className="side-nav right-aligned hide-on-med-and-up fixed"
              navLinks={navLinks}
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
}

Header.propTypes = {
  activeLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
});

export default connect(mapStateToProps, null)(Header);
