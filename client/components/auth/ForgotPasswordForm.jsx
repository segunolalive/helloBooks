import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Loading from '../common/Loading';


/**
 * renders forgot password form
 *
 * @param {Object} props
 *
 * @returns {JSX}  JSX representation of commponent
 */
const ForgotPasswordForm = props => (
  <div>
    <Header />
    <main>
      <div className="container center">
        <div className="row top-30">
          <div className="col s12 m8 offset-m2">
            <form onSubmit={props.onSubmit}>
              <h6>
                Enter your email address and we&apos;ll send you a link
                to reset your password
              </h6>
              <div className="input-field">
                <input
                  type="email"
                  name="email"
                  placeholder="your email here"
                  title="input is not a valid email"
                  value={props.email}
                  onChange={props.onChange}
                />
                <span className="red-text">
                  {props.errors && props.errors.email}
                </span>
              </div>
              {props.loading && <Loading />}
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
      </div>
    </main>
  </div>
);

ForgotPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ForgotPasswordForm;
