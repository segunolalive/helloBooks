export default {
  'home screen': (client) => {
    client
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .assert.title('Hello Books')
      .assert.visible('a#login-btn')
      .assert.visible('a#signup-btn')
      .assert.containsText('#login-btn', 'LOGIN')
      .assert.containsText('#signup-btn', 'SIGNUP')
      .click('a#signup-btn')
      .assert.urlEquals('http://localhost:8080/signup')
      .click('a.brand-logo.left')
      .assert.urlEquals('http://localhost:8080/')
      .click('#login-btn')
      .assert.urlEquals('http://localhost:8080/login')
      .end();
  }
};
