import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import GoogleLogin from 'react-google-login';
import FaGoogle from 'react-icons/lib/fa/google';

import Header from '../Header';
import { login } from '../../actions/login';
import Loading from '../common/Loading';


/**
 * login component
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  /**
   * handler for google sign in
   * @param {any} response
   * @memberof Login
   * @returns {Undefined}  redirects to dashboard
   */
  handleGoogleLogin(response) {
    const googleProfile = response.profileObj;
    this.props.login(googleProfile);
  }

  /**
   * login handler
   * @param {any} event
   * @memberof Login
   * @returns {Undefined} redirects to dashboard
   */
  handleLogin(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.login(this.state);
  }

  /**
   * input field change event handler
   *
   * @param {any} event
   * @memberof Login
   * @returns {Undefined} sets user input in component state
   */
  handleChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = { ...this.state };
    if (event.target.value.trim()) {
      user[formField] = event.target.value.trim();
    }
    this.setState(() => user);
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of component
   * @memberof Login
   */
  render() {
    const loadingState = this.props.isLoading ?
      <Loading text='logging in' /> : null;
    return (
      this.props.isLoggedIn === true ?
        <Redirect to='/dashboard'/> :
        <div>
          <Header />
          <main>
            <section className="account">
              <Row>
                <div className="container">
                  <div className="center">
                    <div className="col l6 m4 s12 welcome">
                      <h2>Hello Reader</h2>
                      <h6>Welcome home avid reader</h6>
                    </div>
                    <div className="col l6 m8 s12">
                      <form onSubmit={this.handleLogin}>
                        <div className="col s12">
                          <h5>Login</h5>
                        </div>
                        <div className="">
                          <div className="container">
                            <div className="input-field">
                              <input type="text"
                                name="username"
                                placeholder="Username"
                                className="validate"
                                required
                                title="username is required for login"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="input-field">
                              <input type="password"
                                name="password"
                                placeholder="password"
                                className="validate"
                                required
                                title="password is required for login"
                                onChange={this.handleChange}
                              />
                            </div>
                            {loadingState}
                            <div className="input-field">
                              <input
                                type="submit"
                                name="submit"
                                value="LOGIN"
                                className="btn waves-effect waves-light"
                                style={{ width: '100%' }}
                              />
                            </div>
                            <div className="input-field">
                              <GoogleLogin
                                clientId={GOOGLE_CLIENT_ID}
                                onSuccess={this.handleGoogleLogin}
                                onFailure={this.handleGoogleLogin}
                                className="btn red darken-4"
                                style={{ width: '100%' }}
                              >
                                <FaGoogle
                                  style={{
                                    color: '#032442',
                                    fontSize: '2rem',
                                  }}
                                />
                                <span> Login with Google</span>
                              </GoogleLogin>
                            </div>
                            <div>
                              <p className="center">Don&apos;t have an account?
                                <Link to="/signup"> Sign up</Link>
                              </p>
                            </div>
                            <div>
                              <p className="center">Forgot password?
                                &nbsp;&nbsp;
                                <Link to="/forgot-password"> Click here</Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Row>
            </section>
          </main>
        </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = ({ authReducer }) => (
  { isLoggedIn: authReducer.isLoggedIn, isLoading: authReducer.authLoading }
);

export default connect(mapStateToProps, { login })(Login);
