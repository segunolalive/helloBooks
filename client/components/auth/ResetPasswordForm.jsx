import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

import Header from '../Header';
import Loading from '../common/Loading';


/**
 * renders reset password form
 *
 * @param {Object} props
 *
 * @returns {JSX}  JSX representation of commponent
 */
const ResetPasswordForm = props => (
  <div>
    <Header />
    <main>
      <div className="container">
        <Row className="center top-20">
          <Col s={12} m={6} offset="m3">
            <h4><strong>Reset Your Password</strong></h4>
            <form onSubmit={props.onSubmit}>
              <input
                type="password"
                placeholder="password"
                name="password"
                required="true"
              />
              <input
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
                required="true"
              />
              {
                props.errors &&
                <div style={{ padding: '20px' }}>
                  <span style={{ color: 'red' }}>
                    {props.errors.password}
                  </span>
                </div>
              }
              {props.loading && <Loading />}
              <input
                type="submit"
                value={props.loading ?
                  'Resetting Password' : 'Change Password'}
                className="btn teal darken-4"
                disabled={props.loading}
              />
            </form>
          </Col>
        </Row>
      </div>
    </main>
  </div>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

export default ResetPasswordForm;
