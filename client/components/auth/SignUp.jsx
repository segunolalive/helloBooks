import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Row } from 'react-materialize';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FaGoogle from 'react-icons/lib/fa/google';

import Header from '../Header';
import { signUp } from '../../actions/signup';
import Loading from '../common/Loading';
import { validateSignUp } from '../../utils/validation/auth';


/**
 * Sign up component
 * @class SignUp
 * @extends {Component}
 */
class SignUp extends Component {
  /**
   * Creates an instance of SignUp.
   * @memberof SignUp
   */
  constructor() {
    super();
    this.state = {
      surname: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoogleSignUp = this.handleGoogleSignUp.bind(this);
  }

  /**
   * sign up handler
   * @param {any} event
   * @memberof SignUp
   * @returns {Undefined} redirects to dashboard
   */
  handleSignUp(event) {
    event.preventDefault();
    const { errors, isValid } = validateSignUp(this.state);
    if (!isValid) {
      return this.setState({ errors });
    }
    return this.props.signUp(this.state);
  }


  /**
   * google login handler
   * @param  {Object} response google auth Object
   * @return {Undefined}       dispatches signup action action
   */
  handleGoogleSignUp(response) {
    const googleProfile = response.profileObj;
    this.props.signUp(googleProfile);
  }

  /**
   * form input change event handler
   *
   * @param {any} event
   * @memberof SignUp
   * @returns {Undefined} sets form input values in the component state
   */
  handleChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = Object.assign({}, this.state);
    user[formField] = event.target.value.trim();
    this.setState(() => user);
  }

  /**
   * renders component to DOM
   *
   * @returns {JSX} JSX representation of component
   * @memberof SignUp
   */
  render() {
    const loadingState = this.props.isLoading ?
      <Loading text='Creating your account' /> : null;
    return (
      this.props.isLoggedIn === true ?
        <Redirect to='/dashboard' /> :
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
                      <form onSubmit={this.handleSignUp}>
                        <div className="col s12">
                          <h5>Sign Up</h5>
                        </div>
                        <div className="">
                          <div className="container">
                            <div className="input-field">
                              <input
                                className="validate"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="input-field">
                              <input
                                className="validate"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="input-field">
                              <input
                                className="validate"
                                type="email"
                                name="email"
                                required
                                data-wrong="enter a valid email"
                                title="email is required"
                                placeholder="Email"
                                onChange={this.handleChange}
                              />
                              <span className="red-text">
                                {this.state.errors && this.state.errors.email}
                              </span>
                            </div>
                            <div className="input-field">
                              <input
                                className="validate"
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                title="username is required"
                                onChange={this.handleChange}
                              />
                              <span className="red-text">
                                {this.state.errors &&
                                  this.state.errors.username}
                              </span>
                            </div>
                            <div className="input-field">
                              <input
                                className="validate"
                                type="password"
                                name="password"
                                placeholder="password"
                                required
                                title="password is required"
                                onChange={this.handleChange}
                              />
                              <span className="red-text">
                                {this.state.errors &&
                                  this.state.errors.password}
                              </span>
                            </div>
                            <div className="input-field">
                              <input
                                className="validate"
                                type="password"
                                name="confirmPassword"
                                placeholder="retype password"
                                required
                                title="password confirmation is required"
                                onChange={this.handleChange}
                              />
                              <span className="red-text">
                                {this.state.errors &&
                                  this.state.errors.confirmPassword}
                              </span>
                            </div>
                            {loadingState}
                            <div className="input-field">
                              <input type="submit"
                                name="submit"
                                value="Sign Up"
                                className="btn waves-effect waves-light"
                                style={{ width: '100%' }}
                              />
                            </div>
                            <div className="input-field">
                              <GoogleLogin
                                clientId={GOOGLE_CLIENT_ID}
                                onSuccess={this.handleGoogleSignUp}
                                onFailure={this.handleGoogleSignUp}
                                className="btn red darken-4"
                                style={{ width: '100%' }}
                              >
                                <FaGoogle
                                  style={{
                                    color: '#032442',
                                    fontSize: '2rem',
                                  }}
                                />
                                <span> Sign Up with Google</span>
                              </GoogleLogin>
                            </div>
                            <div className="">
                              <p>Already have an account?
                                <Link to="/login"> Login</Link>
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

SignUp.propTypes = {
  isLoggedIn: PropTypes.bool,
  signUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = ({ authReducer }) => (
  { isLoggedIn: authReducer.isLoggedIn, isLoading: authReducer.authLoading }
);

export default connect(mapStateToProps, { signUp })(SignUp);
