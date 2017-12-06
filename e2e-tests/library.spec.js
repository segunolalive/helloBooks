export default {
  'user can view library books without logging in': (client) => {
    client
      .url('localhost:8080/library')
      .waitForElementVisible('main')
      .assert.elementPresent('table')
      .assert.elementPresent('tbody')
      .click('#book-1-link')
      .assert.urlEquals('http://localhost:8080/library/book/1')
      .end();
  },

  'user cannot borrow books without logging in. Redirects to login':
  (client) => {
    client
      .url('localhost:8080/library')
      .waitForElementVisible('main')
      .click('#borrow-book-1-btn')
      .waitForElementVisible('#toast-container')
      .assert.urlEquals('http://localhost:8080/library')
      .assert.containsText('.toast', 'Login to proceed')
      .end();
  },

  'user can borrow books when logged in': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]')
      .waitForElementVisible('#dashboard')
      .url('localhost:8080/library')
      .waitForElementVisible('main')
      .click('#borrow-book-2-btn')
      .waitForElementVisible('#toast-container')
      .assert.urlEquals('http://localhost:8080/library')
      .assert.containsText('.toast', 'You have successfully borrowed ' +
        'eloquent ruby again. Check your dashboard to read it')
      .end();
  },

  'user cannot borrow previously borrowed but unreturned books': (client) => {
    client
      .url('localhost:8080/login')
      .waitForElementVisible('#login-form')
      .setValue('input[name="username"]', 'Segun')
      .setValue('input[name="password"]', 'password')
      .click('input[name="submit"]')
      .waitForElementVisible('#dashboard')
      .url('localhost:8080/library')
      .waitForElementVisible('main')
      .click('#borrow-book-2-btn')
      .waitForElementVisible('#toast-container')
      .assert.urlEquals('http://localhost:8080/library')
      .assert.containsText('.toast', 'You currently have this book. Return ' +
        'it before trying to borrow it again')
      .end();
  }
};
