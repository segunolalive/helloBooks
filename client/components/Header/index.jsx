import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './Navigation.jsx';
import Logo from './Logo.jsx';
import toggleSidebar from './toggleSidebar';

/**
 * Component for header and navigation
 *
 * @class Header
 *
 * @extends {Component}
 */
export class HeaderComponent extends Component {
  /**
   * component lifecycle hook called when component mounts the DOM
   * @memberof Header
   *
   * @return {undefined} - initializes DOM manipulation utility(toggleSidebar)
   */
  componentDidMount() {
    toggleSidebar();
  }

  /**
   * renders JSX representation of component
   *
   * @memberof Header
   *
   * @return {JSX} JSX reoprresentation of header and navigation
   */
  render() {
    let navLinks = ['library'];
    navLinks = this.props.isLoggedIn ?
      ['dashboard', ...navLinks, 'history', 'logout'] :
      ['login', 'sign up', ...navLinks];

    if (this.props.user.isAdmin) {
      navLinks = ['admin', ...navLinks];
    }

    return (
      <header className="header">
        <div className="navbar-fixed">
          <nav className="transparent navbar-blue">
            <div className="nav-wrapper">
              <Logo />
              <Navigation
                activeLink={this.props.activeLink}
                className="right hide-on-small-and-down"
                navLinks={navLinks}
              />
              <a href="#" data-activates="slide-out"
                className="button-collapse hide-on-med-and-up right">
                <i className="material-icons">more_vert</i>
              </a>
            </div>
          </nav>
        </div>

        <Navigation
          id="slide-out"
          activeLink={this.props.activeLink}
          className="side-nav right-aligned hide-on-med-and-up"
          navLinks={navLinks}
        />
      </header>
    );
  }
}

HeaderComponent.propTypes = {
  activeLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
});

export default connect(mapStateToProps, null)(HeaderComponent);
