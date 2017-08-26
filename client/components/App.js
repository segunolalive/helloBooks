import React, { Component } from 'react';
import { Row } from 'react-materialize';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Library from './Library';
import ProfileInfo from './ProfileInfo';
import Dashboard from './Dashboard';

import mock from './mock';


/**
 * @public
 * @description React Component encapsulating application user interface
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.categories = mock.categories;
    this.books = mock.books;
  }
  render() {
    return (
      <div className='App'>
        <Header />
        <main className=''>
          <Row>
            <Dashboard />
          </Row>
        </main>
      </div>
    );
  }
}

export default App;
