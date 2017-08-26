import React, { Component } from 'react';
import Navigation from './Navigation';
import Logo from './Logo';

/**
 * 
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.onLinkClick = this.onLinkClick.bind(this);
  }
  
  onLinkClick(event) {

  }

  render() {
    return (
      <header className='header'>
        <nav className='transparent'>
          <div className='nav-wrapper'>
            <Logo />
            <Navigation
              className='right hide-on-small-and-down'
              navLinks={['sign up', 'sign in', 'library']}
              active='sign up'
              onClick={this.onLinkClick(event)}
            />
            <Navigation
              id='slide-out'
              className='side-nav'
              navLinks={['sign up', 'sign in', 'library']}
              onClick={this.onLinkClick(event)}
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


export default Header;
