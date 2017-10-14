import React from 'react';
import { Link } from 'react-router-dom';


const Logo = () => (
  <Link to='#' className='brand-logo left'>
    <i className="material-icons">
      book
    </i>
    Hello Books
  </Link>
);

export default Logo;
