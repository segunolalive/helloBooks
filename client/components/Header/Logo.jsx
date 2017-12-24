import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/hello_icon_32.png';

/**
 * app Logo
 *
 * @returns {JSX} - jsx representation of logo
 */
const Logo = () => (
  <Link to='/' className='brand-logo left'>
    <h5>
      <img src={logo} alt="logo" style={{ verticalAlign: 'middle' }} />
      <span style={{ verticalAlign: 'middle' }}>Hello Books</span>
    </h5>
  </Link>
);

export default Logo;
