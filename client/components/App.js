import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './Home';
import notFound from './404';
import Admin from './Admin';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Library from './library/Library';
import Dashboard from './dashboard/Dashboard';
import Logout from './auth/Logout';

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
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/signup' component={SignUp} />
            <Route path='/library' component={Library} />
            <Route path='/admin' component={Admin} />
            <Route component={notFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
