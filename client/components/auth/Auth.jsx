import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import GoogleLogin from 'react-google-login';
import FaGoogle from 'react-icons/lib/fa/google';

import Header from '../header/Header';
import ForgotPassword from './ForgotPassword';

import { login } from '../../actions/login';
import Loading from '../Loading';

import resetPassword from '../../actions/resetPassword';


/**
 * Parent component for authentication purposes
 * @class Auth
 * @extends {Component}
 */
class Auth extends Component {
  constructor(props) {
    super(props);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }
  /**
   * handler for forgot password form submission
   *
   * @param {any} event
   * @memberof Auth
   * @returns {Undefined} sends an http request
   */
  handleForgotPassword(event) {
    event.preventDefault();
    const email = event.target.email.value;
    this.props.resetPassword(email);
  }
  /**
   * renders component to DOM
   * @returns {JSX} JSX representation of component
   * @memberof Auth
   */
  render() {
    return (
      <div>
        <ForgotPassword handleSubmit={this.handleForgotPassword} />
      </div>
    );
  }
}

Auth.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(Auth);
