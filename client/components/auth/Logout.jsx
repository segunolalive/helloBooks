import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';

import logout from '../../actions/authActions/logout';
import notify from '../../actions/notify';


/**
 * handles logging a user out
 * @class Logout
 * @extends {Component}
 */
class Logout extends Component {
  /**
   * [componentDidMount description]
   * @memberof Logout
   * @return {[type]} [description]
   */
  componentDidMount() {
    notify.success('Successfully logged out');
    this.props.logout();
    this.props.history.push('/');
  }
  /**
   * renders component to DOM
   * @memberof Logout
   * @return {JSX} JSX reprresentation of DOM
   */
  render() {
    return (
      <Row className="center landing">
        <h1 className="">
          Logging out...
        </h1>
      </Row>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};


export default connect(null, { logout })(Logout);
