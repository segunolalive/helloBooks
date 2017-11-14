import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-materialize';
import { Redirect } from 'react-router-dom';

import Header from '../Header';
import { updateProfile } from '../../actions/updateProfile';

/**
 * Component to update user profile
 * @type {Object}
 */
class UpdateProfile extends Component {
  /**
   * constructs instance of Component
   * @param {Object} props
   * @return {Object} JSX component
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      password: '',
      newPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * updates component state with changes in the form fields
   * @param  {any} event    DOM change event
   * @return {Undefined }   updates component state
   */
  handleChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = { ...this.state };
    if (event.target.value.trim()) {
      user[formField] = event.target.value.trim();
      this.setState(() => user);
    }
  }
  /**
   * handles form submission
   * @param {Object} event DOM onSubmit event
   * @return {Undefined}   sends a network request
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
    this.setState(() => ({ redirect: true }));
  }

  /**
   * class method that renders a component to the DOM
   * @return {Object} JSX element
   */
  render() {
    return (this.state.redirect === true ?
      <Redirect to='/dashboard' /> :
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
                    onChange={this.handleChange}
                    name="firstName"
                    defaultValue={this.state.firstName || ''}
                  />
                </div>
                <div className="input-field">
                  <h6>Last Name:</h6>
                  <input
                    onChange={this.handleChange}
                    name="lastName"
                    defaultValue={this.state.lastName || ''}
                  />
                </div>
                <h6 className="red-text darken-4" >
                  Leave the password fields empty unless you actually want
                  to change your password
                </h6>
                <div className="input-field">
                  <h6>Current Password:</h6>
                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    defaultValue={this.state.currentPassword}
                  />
                </div>
                <div className="input-field">
                  <h6>New Password:</h6>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="newPassword"
                    defaultValue={this.state.newPassword}
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
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer }) => ({
  user: authReducer.user,
});

export default connect(mapStateToProps, { updateProfile })(UpdateProfile);
