export default {
  'user can sign up': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .click('#signup-btn')
      .waitForElementVisible('#signup-form')
      .setValue('input[name="email"]', 'xyz@xyz.com')
      .setValue('input[name="username"]', 'xyz')
      .setValue('input[name="password"]', 'xyz')
      .setValue('input[name="confirmPassword"]', 'xyz')
      .click('input[name="submit"]')
      .waitForElementVisible('main#dashboard')
      .assert.urlEquals('http://localhost:8080/dashboard')
      .end();
  },

  'user receives an error if required fields are empty': (client) => {
    client
      .url('http://localhost:8080/signup')
      .waitForElementVisible('#signup-form')
      .click('input[name="submit"]')
      .assert.containsText('#error-email', 'Email is required')
      .assert.containsText('#error-username', 'Username is required')
      .assert.containsText('#error-password', 'Password is required')
      .assert.containsText('#error-confirm-password',
        'Password confirmation is required')
      .end();
  },

  'user cannot sign up with taken username': (client) => {
    client
      .url('http://localhost:8080/signup')
      .waitForElementVisible('#signup-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="email"]', 'xyz@xyz.com')
      .setValue('input[name="password"]', 'xyz')
      .setValue('input[name="confirmPassword"]', 'xyz')
      .click('input[name="submit"]')
      .waitForElementVisible('#toast-container')
      .assert.urlEquals('http://localhost:8080/signup')
      .assert.containsText('.toast', 'username is taken')
      .end();
  },

  'user cannot sign up with taken email': (client) => {
    client
      .url('http://localhost:8080/signup')
      .waitForElementVisible('#signup-form')
      .setValue('input[name="username"]', 'something-new')
      .setValue('input[name="email"]', 'abc@gmail.com')
      .setValue('input[name="password"]', 'xyz')
      .setValue('input[name="confirmPassword"]', 'xyz')
      .click('input[name="submit"]')
      .waitForElementVisible('#toast-container')
      .assert.urlEquals('http://localhost:8080/signup')
      .assert.containsText('.toast', 'email is associated with an account')
      .end();
  },
};
