import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logout from '../../actions/authActions/logout';
import Notify from '../../actions/Notify';


/**
 * handles logging a user out
 *
 * @class Logout
 *
 * @extends {Component}
 */
export class Logout extends Component {
  /**
   * lifecycle method called on mounting the DOM
   * @memberof Logout
   *
   * @return {undefined} makes network requests
   */
  componentDidMount() {
    Notify.success('Successfully logged out');
    this.props.logout();
    this.props.history.push('/');
  }
  /**
   * renders component to DOM
   *
   * @memberof Logout
   *
   * @return {JSX} JSX reprresentation of DOM
   */
  render() {
    return (
      <div className="center landing">
        <h1 className="">
          Logging out...
        </h1>
      </div>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};


export default connect(null, { logout })(Logout);
