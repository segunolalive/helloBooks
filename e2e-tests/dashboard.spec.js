export default {
  'users can visit their dashboard after logging in': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]')
      .waitForElementVisible('#dashboard')
      .assert.containsText('.profile-info h6', 'Segun Ola')
      .end();
  },

  'users cannot visit their dashboard unless logged in': (client) => {
    client
      .url('localhost:8080/dashboard')
      .waitForElementVisible('#toast-container')
      .assert.containsText('.toast', 'Login to proceed')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  },

  'users can return borrowed books from their dashboard': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]')
      .waitForElementVisible('#dashboard')
      .waitForElementNotVisible('#toast-container')
      .click('#return-book-1-btn')
      .waitForElementVisible('#toast-container')
      .assert.containsText('.toast',
        'You have successfully returned eloquent javascript')
      .assert.elementNotPresent('#return-book-1-btn')
      .end();
  },
};
