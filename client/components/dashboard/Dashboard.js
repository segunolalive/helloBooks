import React, { Component } from 'react';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';

/*
 eslint-disable
 */
class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header
          navLinks={['dashboard', 'history', 'library', 'logout']}
          activeLink='dashboard'
        />
        <main>
          <Row>
            <Col s={12}>
              <ProfileInfo />
              <Borrowed />
              <SuggestedBooks />
            </Col>
          </Row>
        </main>
      </div>
    );
  }
}


export default Dashboard;
