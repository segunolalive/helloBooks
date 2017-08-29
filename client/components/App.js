import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './Home';
import Admin from './Admin';
import SignUp from './SignUp';
import Login from './Login';
import Library from './Library';
import Dashboard from './dashboard/Dashboard';

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
            <Route path='/signup' component={SignUp} />
            <Route path='/library' component={Library} />
            <Route path='/admin' component={Admin} />
            <Route render={() => {
              return (
                <div className="center landing">
                  <h2>Not Found</h2>
                </div>
              );
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
