import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';
import { connect } from 'react-redux';
import Header from './Header';


/**
 * Landing page
 *
 * @param {Object} props Object containing isLoggedIn key
 *
 * @returns {JSX}        JSX representation of the the landing page
 */
export const Home = props => (
  props.isLoggedIn ? <Redirect to='/dashboard' /> :
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
                <Link to="/login" className="btn" id="login-btn">login</Link>
                <Link to="/signup" className="btn" id="signup-btn">signup</Link>
              </div>
            </section>
          </div>
        </Row>
      </main>
    </div>
);

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = ({ authReducer }) => ({
  isLoggedIn: authReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Home);
