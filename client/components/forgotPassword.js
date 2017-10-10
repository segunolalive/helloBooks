import React from 'react';
import Header from './header/Header';

const ForgotPassword = () => (
  <div>
    <Header />
    <main>
      <div className="row">
        <div className="container center">
          <form>
            <h6>
              Enter your email address and we&apos;ll send you a link
              to reset your password
            </h6>
            <div
              className="input-field"
            >
              <input
                type="text"
                placeholder="your email here"
              />
            </div>
            <div
              className="input-field"
            >
              <input
                type="submit"
                value="send"
                className="btn teal darken-4"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
);

export default ForgotPassword;
