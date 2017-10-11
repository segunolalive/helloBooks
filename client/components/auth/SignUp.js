import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Row } from 'react-materialize';
import { connect } from 'react-redux';

import Header from '../header/Header';
import { signUp } from '../../actions/signup';
import Loading from '../Loading';

const Materialize = window.Materialize;

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
  }

  /**
   * sign up handler
   * @param {any} event 
   * @memberof SignUp
   * @returns {Undefined} redirects to dashboard
   */
  handleSignUp(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.signUp(this.state)
      .then(
        () => {
          Materialize.toast(
            'Welcome To Hello Books. This is your dashboard',
            2500,
            'teal darken-4'
          );
        },
        (error) => {
          Materialize.toast(error.response.data.message, 2500, 'red darken-4');
          this.setState({ isLoading: false });
        }
      )
      .catch(() => {
        Materialize.toast(
          'Something terrible happened. We\'ll fix that',
          2500,
          'red darken-4'
        );
        this.setState({ isLoading: false });
      });
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
    if (!!event.target.value.trim()) {
      user[formField] = event.target.value.trim();
    }
    this.setState(() => user);
  }

  /**
   * renders component to DOM
   * 
   * @returns {JSX} JSX representation of component
   * @memberof SignUp
   */
  render() {
    const loadingState = this.state.isLoading ?
      <Loading text='Creating your account' /> : null;
    return (
      this.props.isLoggedIn === true ?
        <Redirect to='/dashboard' /> :
        <div>
          <Header
            navLinks={['login', 'sign up', 'library']}
          />
          <main>
            <section className="account">
              <Row>
                <div className="container">
                  <div className="center">
                    <div className="col m6 s12 welcome">
                      <h2>Hello Reader</h2>
                      <h6>Welcome home avid reader</h6>
                    </div>
                    <div className="col m6 s12">
                      <form onSubmit={this.handleSignUp}>
                        <div className="col s12">
                          <h5>Sign Up</h5>
                        </div>
                        <div className="col s12">
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
};

const mapStateToProps = ({ authReducer }) => (
  { isLoggedIn: authReducer.isLoggedIn }
);

export default connect(mapStateToProps, { signUp })(SignUp);
