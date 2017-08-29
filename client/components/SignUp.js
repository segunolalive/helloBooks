import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-materialize';
import Header from './header/Header';

/**
 *
 */
class SignUp extends Component {
  render() {
    return (
      <div>
        <Header
          navLinks={['login', 'sign up', 'library']}
        />
        <main>
          <section className="account">
            <Row>
              <div className="container">
                <div className="center">
                  <div className="col m6 s12 welcome">
                    <h2>Hello Reader</h2>
                    <h6>Welcome home avid reader</h6>
                  </div>
                  <div className="col m6 s12">
                    <form className="" action="/signup" method="post">
                      <div className="col s12">
                        <h5>Sign Up</h5>
                      </div>
                      <div className="col s12">
                        <div className="container">
                          <div className="input-field">
                            <input type="text" name="surname" placeholder="Surname" />
                          </div>
                          <div className="input-field">
                            <input type="text" name="firstname" placeholder="First Name" />
                          </div>
                          <div className="input-field">
                            <input type="email" name="email" placeholder="Email" />
                          </div>
                          <div className="input-field">
                            <input type="text" name="username" placeholder="Username" />
                          </div>
                          <div className="input-field">
                            <input type="password" name="password" placeholder="password" />
                          </div>
                          <div className="input-field">
                            <input type="password" name="confirmPassword"
                              placeholder="retype password" />
                          </div>
                          <div className="input-field">
                            <input type="submit" name="submit" value="Sign Up" className="btn" />
                          </div>
                          <div className="">
                            <p>Already have an account?
                              <Link to="/login"> Login</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Row>
          </section>
        </main>
      </div>
    );
  }
}

export default SignUp;
