import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Logout extends Component {
  componentDidMount(){
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
  router: PropTypes.object.isRequired
};

export default Logout;
