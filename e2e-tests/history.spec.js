export default {
  'users can check their history after login': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]')
      .waitForElementVisible('#dashboard')
      .click('#history-nav-link')
      .waitForElementVisible('h4.bold-text')
      .assert.containsText('#page-message', 'Your Borrowed Books')
      .click('#view-transactions-btn')
      .waitForElementVisible('#history')
      .assert.containsText('h4.bold-text', 'All Transactions')
      .end();
  },

  'users cannot view history page if not logged in. Redirrects to login':
  (client) => {
    client
      .url('localhost:8080/history')
      .waitForElementVisible('#toast-container')
      .assert.urlEquals('http://localhost:8080/login')
      .assert.containsText('.toast', 'Login to proceed')
      .end();
  }
};
