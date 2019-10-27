const chromedriver = require('chromedriver');
const dotenv = require('dotenv');

module.exports = {
  before: function(done) {
    chromedriver.start();
    dotenv.config();
    done();
  },

  after: function(done) {
    chromedriver.stop();
    done();
  }
};