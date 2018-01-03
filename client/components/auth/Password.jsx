import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import requestResetPassword
  from '../../actions/authActions/requestResetPassword';
import resetPassword from '../../actions/authActions/resetPassword';

import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import { validateForgotPassword } from '../../utils/validation/auth';


/**
 * Parent component for authentication purposes
 *
 * @class Auth
 *
 * @extends {Component}
 */
export class Password extends Component {
    state = { loading: false, email: '', errors: {} };

  /**
   * handler for forgot password form submission
   *
   * @memberof Password
   *
   * @param {any} event
   *
   * @returns {Undefined} sends an http request
   */
  handleForgotPassword = (event) => {
    event.preventDefault();
    const { errors, isValid } = validateForgotPassword(this.state);
    if (isValid) {
      return this.setState(() => ({ loading: true }), () => {
        this.props.requestResetPassword(this.state.email.trim())
          .then(() =>
            this.setState(() => ({ email: '', loading: false }))
          );
      });
    }
    this.setState({ errors });
  }

  /**
   * input field change event handler
   *
   * @param {any} event
   *
   * @memberof Password
   *
   * @returns {undefined} sets user input in component state
   */
  handleChange = (event) => {
    event.preventDefault();
    const formField = event.target.name;
    const state = { ...this.state };
    state[formField] = event.target.value.trim();
    this.setState(() => state);
  }

  /**
   * handler for password ResetPasswordForm
   *
   * @param {any} event DOM event
   *
   * @returns {Promise} resolves with http response data
   */
  handleResetPassword = (event) => {
    event.preventDefault();
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    if (password && password === confirmPassword) {
      this.setState(() => ({ loading: true }));
      const token = this.props.location.search.slice(7);
      return this.props.resetPassword(password, token)
        .then(() => {
          this.setState(() => ({ loading: false, redirect: true }));
        });
    }
    this.setState(() => ({ errors: { password: 'passwords don\'t match' } }));
  }

  /**
   * renders form
   *
   * @return {JSX} react element
   */
  renderChild = () => {
    switch (this.props.match.url) {
      case '/reset-password':
        return (
          this.state.redirect ? <Redirect to='/login' /> :
            <div>
              <ResetPasswordForm
                onSubmit={this.handleResetPassword}
                loading={this.state.loading}
                errors={this.state.errors}
                buttonText={this.state.loading ? 'resetting password' : 'send'}
              />
            </div>
        );
      case '/forgot-password':
        return (
          <div>
            <ForgotPasswordForm
              email={this.state.email}
              onChange={this.handleChange}
              onSubmit={this.handleForgotPassword}
              loading={this.state.loading}
              errors={this.state.errors}
              buttonText={this.state.loading ? 'sending your link' : 'send'}
            />
          </div>
        );
      default:
        return <Redirect to='/'/>;
    }
  }

  /**
   * renders component to DOM
   *
   * @memberof Password
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return this.props.isLoggedIn === true ?
      <Redirect to='/dashboard' /> :
      this.renderChild();
  }
}

Password.propTypes = {
  requestResetPassword: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authReducer }) => (
  { isLoggedIn: authReducer.isLoggedIn }
);

export default connect(
  mapStateToProps, {
    requestResetPassword,
    resetPassword,
  })(Password);
