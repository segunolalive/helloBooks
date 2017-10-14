import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';

import { logout } from '../../actions/logout';

const Materialize = window.Materialize;

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
    Materialize.toast('Successfully logged out', 2500, 'teal darken-4');
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
