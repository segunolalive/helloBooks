import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-materialize';
import Header from './header/Header';

const Home = () => (
  <div>
    <Header
      navLinks={['login', 'sign up', 'library']}
    />
    <main>
      <Row>
        <div className="container">
          <section className="center landing">
            <div>
              <h2 style={ { fontWeight: 'bold' } }>Welcome To Hello Books</h2>
            </div>
            <div>
              <Link to="/login" className="btn">login</Link>
              <Link to="/signup" className="btn">signup</Link>
            </div>
          </section>
        </div>
      </Row>
    </main>
  </div>
);

export default Home;
