
const chromedriver = require('chromedriver');
const dotenv = require('dotenv');

module.exports = {
  before: function(done) {
    // start browser emulator
    chromedriver.start();
    // .env locals
    dotenv.config();
    done();
  },

  after: function(done) {
    chromedriver.stop();
    done();
  }
};