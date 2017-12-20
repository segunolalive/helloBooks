import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './Home';
import History from './History';
import NotFound from './NotFound';
import Admin from './Admin';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Library from './Library';
import BookDetail from './Library/BookDetail';
import Dashboard from './Dashboard';
import Logout from './auth/Logout';
import Password from './auth/Password';
import UpdateProfile from './Dashboard/UpdateProfile';
import PdfViewer from './Dashboard/PdfViewer';


/**
 * @public
 *
 * @class App
 *
 * @description React Component encapsulating application user interface
 *
 * @extends {Component}
 */
class App extends Component {
  /**
   * renders app to DOM
   *
   * @memberof App
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/update-profile' component={UpdateProfile} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/signup' component={SignUp} />
            <Route path='/library/book/:id' component={BookDetail} />
            <Route path='/library' exact component={Library} />
            <Route path='/read' exact component={PdfViewer} />
            <Route path='/history' component={History} />
            <Route path='/admin/edit:id' component={Admin} />
            <Route path='/admin/add' component={Admin} />
            <Route path='/admin' component={Admin} />
            <Route path='/forgot-password' component={Password} />
            <Route path='/reset-password' component={Password} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
