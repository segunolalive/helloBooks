import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    let navLinks = ['library'];
    this.props.isLoggedIn ?
      navLinks = ['dashboard', ...navLinks, 'history', 'logout'] :
      navLinks = ['login', 'sign up', ...navLinks]

    if (this.props.user && this.props.user.isAdmin) {
      navLinks = ['admin' ,...navLinks]
    }

    return (
      <header className="header">
        <nav className="transparent">
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

              className="side-nav right-aligned"
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
};

Header.propTypes = {
  activeLink: PropTypes.string,
};

const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
  user: authReducer.user,
});

export default connect(mapStateToProps, null)(Header);
