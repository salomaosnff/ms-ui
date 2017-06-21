module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('#test', 5000)
      .click('#test');

      setInterval(function() {
          browser.click("#test");
      }, 2000);

      setTimeout(function() {
          browser.end();
      }, 10000);
  }
};