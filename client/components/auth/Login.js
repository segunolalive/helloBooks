import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';
import GoogleLogin from 'react-google-login';
import FaGoogle from 'react-icons/lib/fa/google';

import Header from '../header/Header';
import { login } from '../../actions/login';
import Loading from '../Loading';


const Materialize = window.Materialize;

/*
  eslint-disable
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    // const loginProfile = response.getBasicProfile();
    console.log(response);
  }

  handleLogin(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.login(this.state)
    .then(
      (data) => {
        Materialize.toast(
          `Welcome Back, ${data.firstName || 'Reader'}`,
          2500,
          'teal darken-4'
        );
      },
      (error) => {
        Materialize.toast(error.response.data.message, 2500, 'red darken-4');
        this.setState({ isLoading: false });
      }
    )
    .catch((err) => {
      Materialize.toast(
        `Ouch! Something went awry. It's probably our fault`,
        2500,
        'red darken-4'
      );
        this.setState({ isLoading: false });
      });
  }

  handleChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = Object.assign({}, this.state);
    if (!!event.target.value.trim()) {
      user[formField] = event.target.value.trim();
    }
    this.setState(() => user);
  }

  render() {
    const loadingState = this.state.isLoading ?
      <Loading text='logging in' /> : null
    return (
      this.props.isLoggedIn === true ?
      <Redirect to='/dashboard'/> :
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
                    <form onSubmit={this.handleLogin}>
                      <div className="col s12">
                        <h5>Login</h5>
                      </div>
                      <div className="col s12">
                        <div className="container">
                          <div className="input-field">
                            <input type="text"
                              name="username"
                              placeholder="Username"
                              className="validate"
                              required
                              title="username is required for login"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input type="password"
                              name="password"
                              placeholder="password"
                              className="validate"
                              required
                              title="password is required for login"
                              onChange={this.handleChange}
                            />
                          </div>
                          {loadingState}
                          <div className="input-field">
                            <input
                              type="submit"
                              name="submit"
                              value="LOGIN"
                              className="btn waves-effect waves-light"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div className="input-field">
                            {/* <GoogleLogin
                              clientId={GOOGLE_CLIENT_ID}
                              onSuccess={this.responseGoogle}
                              onFailure={this.responseGoogle}
                              className="btn red darken-4"
                              style={{ width: '100%' }}
                            >
                              <FaGoogle
                                style={{
                                  color: '#032442',
                                  fontSize: '2rem',
                                }}
                              />
                              <span> Login with Google</span>
                            </GoogleLogin> */}
                          </div>
                          <div>
                            <p className="center">Don&apos;t have an account?
                              <Link to="/signup"> Sign up</Link>
                            </p>
                          </div>
                          <div>
                            <p className="center">Forgot password? &nbsp; &nbsp;
                              <Link to="/forgot-password"> Click here</Link>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authReducer }) => (
  { isLoggedIn: authReducer.isLoggedIn }
);


export default connect(mapStateToProps, { login })(Login);
