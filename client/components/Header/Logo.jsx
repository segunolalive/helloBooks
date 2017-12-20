import React from 'react';
import { Link } from 'react-router-dom';

/**
 * app Logo
 *
 * @returns {JSX} - jsx representation of logo
 */
const Logo = () => (
  <Link to='/' className='brand-logo left'>
    <i className="material-icons">
      book
    </i>
    Hello Books
  </Link>
);

export default Logo;
