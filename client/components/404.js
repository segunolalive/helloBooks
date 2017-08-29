import React from 'react';
import Header from './header/Header';

const notFound = () => (
  <div>
    <Header
      navLinks={['dashboard', 'history', 'library']}
    />
    <div className="center landing">
      <h2>Not Found</h2>
    </div>
  </div>
);

export default notFound;
