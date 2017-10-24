import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/Header';

const ForgotPassword = props => (
  <div>
    <Header />
    <main>
      <div className="row">
        <div className="container center">
          <form onSubmit={props.handleSubmit}>
            <h6>
              Enter your email address and we&apos;ll send you a link
              to reset your password
            </h6>
            <div
              className="input-field"
            >
              <input
                type="email"
                name="email"
                placeholder="your email here"
                required="true"
                title="input is not a valid email"
              />
            </div>
            <div
              className="input-field"
            >
              <input
                type="submit"
                value="send"
                className="btn teal darken-4"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
);

ForgotPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ForgotPassword;
