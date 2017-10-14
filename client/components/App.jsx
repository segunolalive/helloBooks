import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './Home';
import History from './history/History';
import notFound from './404';
import Admin from './admin/Admin';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Library from './library/Library';
import BookDetail from './library/BookDetail';
import Dashboard from './dashboard/Dashboard';
import Logout from './auth/Logout';
// import ForgotPassword from './forgotPassword';
//
// import UpdateProfile from './dashboard/UpdateProfile';

import mock from './mock';


/**
 * @public
 * @class App
 * @description React Component encapsulating application user interface
 * @extends {Component}
 */
class App extends Component {
  /**
   * Creates an instance of App.
   * @param {Object} props 
   * @memberof App
   */
  constructor(props) {
    super(props);
    this.categories = mock.categories;
    this.books = mock.books;
  }
  /**
   * renders app to DOM
   * 
   * @returns {JSX} JSX representation of component
   * @memberof App
   */
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            {/* <Route path='/update-profile'component={UpdateProfile} /> */}
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/signup' component={SignUp} />
            <Route path='/library/book/:id' component={BookDetail} />
            <Route path='/library' exact component={Library} />
            <Route path='/history' component={History} />
            <Route path='/admin/edit' component={Admin} />
            <Route path='/admin/add' component={Admin} />
            <Route path='/admin' component={Admin} />
            {/* <Route path='/forgot-password' component={ForgotPassword} /> */}
            <Route component={notFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
