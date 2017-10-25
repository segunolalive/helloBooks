import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/Header';
import Loading from '../Loading';

const ForgotPasswordForm = (props) => {
  const showLoading = props.loading ? <Loading /> : null;
  return (
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
              {showLoading}
              <div
                className="input-field"
              >
                <input
                  type="submit"
                  value={props.buttonText}
                  className="btn teal darken-4"
                  disabled={props.loading}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ForgotPasswordForm;
