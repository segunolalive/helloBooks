import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, Row } from 'react-materialize';

import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';


class Dashboard extends Component {
  render() {
    return (
      <Col s={12}>
        <ProfileInfo />
        <Borrowed />
        <SuggestedBooks />
      </Col>
    );
  }
}


export default Dashboard;
