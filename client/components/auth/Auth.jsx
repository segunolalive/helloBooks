import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import requestResetPassword from '../../actions/requestResetPassword';
import ForgotPasswordForm from './ForgotPasswordForm';


/**
 * Parent component for authentication purposes
 * @class Auth
 * @extends {Component}
 */
class Auth extends Component {
  /**
   * Creates an instance of Auth.
   * @param {any} props
   * @memberof Auth
   */
  constructor(props) {
    super(props);
    this.state = { loading: false };
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
    this.setState(() => ({ loading: true }));
    this.props.requestResetPassword(email)
      .then(() => this.setState(() => ({ loading: false })));
  }
  /**
   * renders component to DOM
   * @returns {JSX} JSX representation of component
   * @memberof Auth
   */
  render() {
    return (
      <div>
        <ForgotPasswordForm
          handleSubmit={this.handleForgotPassword}
          loading={this.state.loading}
          buttonText={this.state.loading ? 'sending your link' : 'send'}
        />
      </div>
    );
  }
}

Auth.propTypes = {
  requestResetPassword: PropTypes.func.isRequired,
};

export default connect(null, { requestResetPassword })(Auth);
