import React, { Component } from 'react';

/**
 * 
 */
class SignUp extends Component {
  render() {
    return (
      <section className="account">
        <div className="row">
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
                        <p>Already have an account?<a href="login.html"> Login Here</a></p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SignUp;
