import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-materialize';
import { connect } from 'react-redux';

import Header from '../header/Header';

/**
 *
 */
class SignUp extends Component {
  constructor () {
    super();
    this.state = {
      surname: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
  }

  handleChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = Object.assign({}, this.state);
    user[formField] = event.target.value;
    this.setState(() => user);
  }

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
                    <form onSubmit={this.handleSignUp}>
                      <div className="col s12">
                        <h5>Sign Up</h5>
                      </div>
                      <div className="col s12">
                        <div className="container">
                          <div className="input-field">
                            <input
                              className="validate"
                              type="text"
                              name="surname"
                              placeholder="Surname"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              className="validate"
                              type="text"
                              name="firstname"
                              placeholder="First Name"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              className="validate"
                              type="email"
                              name="email"
                              required
                              title="email is required"
                              placeholder="Email"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              className="validate"
                              type="text"
                              name="username"
                              placeholder="Username"
                              required
                              title="username is required"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              className="validate"
                              type="password"
                              name="password"
                              placeholder="password"
                              required
                              title="password is required"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              className="validate"
                              type="password"
                              name="confirmPassword"
                              placeholder="retype password"
                              required
                              title="password confirmation is required"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input type="submit"
                              name="submit"
                              value="Sign Up"
                              className="btn"
                            />
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
