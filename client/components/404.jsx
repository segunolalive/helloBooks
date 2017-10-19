import React from 'react';
import Header from './header/Header';

const notFound = () => (
  <div>
    <Header />
    <div className="center landing">
      <h1 style={{ fontWeight: 'bold' }}>404</h1>
      <h2>Not Found</h2>
    </div>
  </div>
);

export default notFound;
