import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * [className description]
 * @type {String}
 */
class Logout extends Component {
  /**
   * [componentDidMount description]
   * @return {[type]} [description]
   */
  componentDidMount() {
    sessionStorage.removeItem('token');
    Materialize.toast('Successfully logged out', 4000, 'green');
    this.props.history.push('/');
  }

  render() {
    return (
      <h1 className="center landing">
        Logging out...
      </h1>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.object.isRequired
};

export default Logout;
