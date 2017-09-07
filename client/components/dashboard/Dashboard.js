import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-materialize';

import Header from '../header/Header';
import Borrowed from './Borrowed';
import ProfileInfo from './ProfileInfo';
import SuggestedBooks from './SuggestedBooks';

/*
 eslint-disable
 */
class Dashboard extends Component {
  handleRedirect () {
    Materialize.toast('Login to proceed', 3000, 'red');
    return (<Redirect to='/login'/>)
  }
  render() {
    return (
      this.props.isLoggedIn !==true ?
      this.handleRedirect() :
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

const mapStateToProps = ({ authReducer }) => ({ isLoggedIn: authReducer.isLoggedIn })

export default connect(mapStateToProps, null)(Dashboard);
