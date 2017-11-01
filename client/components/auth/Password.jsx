import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import requestResetPassword from '../../actions/requestResetPassword';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import resetPassword from '../..//actions/resetPassword';


/**
 * Parent component for authentication purposes
 * @class Auth
 * @extends {Component}
 */
class Password extends Component {
  /**
   * Creates an instance of Password.
   * @param {any} props
   * @memberof Password
   */
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.renderChild = this.renderChild.bind(this);
  }
  /**
   * handler for forgot password form submission
   *
   * @param {any} event
   * @memberof Password
   * @returns {Undefined} sends an http request
   */
  handleForgotPassword(event) {
    event.preventDefault();
    const email = event.target.email.value.trim();
    this.setState(() => ({ loading: true }));
    this.props.requestResetPassword(email)
      .then(() =>
        this.setState(() => ({ loading: false }))
      );
  }
  /**
   * handler for password ResetPasswordForm
   * @param {any} event DOM event
   * @returns {Undefined} sends an http requestResetPassword
   */
  handleResetPassword(event) {
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
   * @return {JSX} react element
   */
  renderChild() {
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
   * @returns {JSX} JSX representation of component
   * @memberof Password
   */
  render() {
    return this.props.isLoggedIn === true ?
      <Redirect to='/dashboard'/> :
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
