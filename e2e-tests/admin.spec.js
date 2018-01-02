export default {
  beforeEach: (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]');
  },

  'admin users have access to admin page': (client) => {
    client
      .waitForElementVisible('#dashboard')
      .click('#admin-nav-link')
      .waitForElementVisible('#admin')
      .assert.urlEquals('http://localhost:8080/admin')
      .assert.visible('#books-section')
      .assert.visible('#notifications-section')
      .assert.visible('#categories-section')
      .end();
  },

  'admin user can add new book': (client) => {
    client
      .waitForElementVisible('#dashboard')
      .url('http://localhost:8080/admin')
      .waitForElementVisible('#admin')
      .setValue('input[name="title"]', 'crud code')
      .setValue('input[name="authors"]', 'fola, tunde')
      .setValue('textarea[name="description"]', 'odd new book')
      .setValue('input[name="total"]', '10')
      .click('.select-wrapper')
      .waitForElementVisible('.dropdown-content li:nth-child(4)')
      .click('.dropdown-content li:nth-child(4)')
      .click('#submit-book-form-btn')
      .waitForElementVisible('#toast-container')
      .assert.containsText('.toast',
        'Successfully added crud code to Library')
      .url('localhost:8080/library')
      .waitForElementVisible('.books-table')
      .waitForElementVisible('#row-5')
      .assert.containsText('#row-5 td:nth-child(2) a', 'crud code')
      .end();
  },

  'non-admin users do not have access to admin page. Redirects to login':
  (client) => {
    client
      .url('localhost:8080/logout')
      .waitForElementVisible('body')
      .url('localhost:8080/admin')
      .assert.urlEquals('http://localhost:8080/login')
      .waitForElementVisible('#toast-container')
      .assert.containsText('.toast', 'Login to proceed')
      .end();
  },

  'admin user can add new book category': (client) => {
    client
      .waitForElementVisible('#dashboard')
      .url('http://localhost:8080/admin')
      .waitForElementVisible('#admin')
      .setValue('#category-input', 'comedy')
      .submitForm('#category-form')
      .waitForElementVisible('#toast-container')
      .assert.containsText('.toast',
        'Successfully added new category, comedy, to Library')
      .url('localhost:8080/library')
      .waitForElementVisible('.select-dropdown')
      .click('input.select-dropdown')
      .waitForElementVisible('ul.dropdown-content')
      .assert.containsText('ul.dropdown-content li:nth-child(5) span', 'comedy')
      .end();
  },
};
