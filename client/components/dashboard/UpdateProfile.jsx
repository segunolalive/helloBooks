import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';

/**
 * Component to update user profile
 * @type {Object}
 */
class UpdateProfile extends Component {
  /**
   * constructs instance of Component
   * @return {Object} JSX component
   */
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

  }
  /**
   * handles form submission
   * @param {Object} event DOM onSubmit event
   * @return {Undefined}   sends a network request
   */
  handleSubmit(event) {
    event.preventDefault();
  }

  /**
   * class method that renders a component to the DOM
   * @return {Object} JSX element
   */
  render() {
    return (
      <div>
        <Header
          activeLink='dashboard'
        />
        <main>
          <Row>
            <Col s={12} m={6} className="offset-m3">
              <form onSubmit={this.handleSubmit}>
                <div style={{ marginBottom: '50px' }}>
                  <h5 className="center" >
                    Update your profile information
                  </h5>
                </div>

                <div className="input-field">
                  <h6>First Name:</h6>
                  <input
                    id="firstName"
                    defaultValue={this.props.user.firstName || ''}
                  />
                </div>
                <div className="input-field">
                  <h6>Last Name:</h6>
                  <input
                    id="lastName"
                    defaultValue={this.props.user.lastName || ''}
                  />
                </div>
                <h6 className="red-text darken-4" >
                  Leave the password fields empty unless you actually want
                  to change your password
                </h6>
                <div className="input-field">
                  <h6>Current Password:</h6>
                  <input
                    id=""
                    type="password"
                    defaultValue=""
                  />
                </div>
                <div className="input-field">
                  <h6>New Password:</h6>
                  <input
                    type="password"
                    id="newPassword"
                    defaultValue=""
                  />
                </div>
                <div className="input-field">
                  <input
                    className="btn teal darken-4 waves-effect waves-light"
                    style={{ width: '100%' }}
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </Col>
          </Row>
        </main>
      </div>
    );
  }
}

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  user: authReducer.user,
});

export default connect(mapStateToProps)(UpdateProfile);
