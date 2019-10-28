var loginlol = require('./login');

module.exports = {
    
    'location': function(browser) {
        const region = {
            opener:'[data-auto="region-form-opener"]'
        }
        const timeouts = {
            request: 5000,
            animation: 3000
        }
        browser
            .url('https://beru.ru/', () => {
                console.log('Loading https://beru.ru/');
            })
            .waitForElementVisible(region.opener, timeouts.request)
            .click(region.opener)
            .waitForElementVisible('[data-auto="modal"]', timeouts.animation)
            .moveToElement('._2JDvXzYsUI', 100, 100, function() {
                    browser.waitForElementVisible('._2JDvXzYsUI', 500, function () {
                        browser.click('._8iW7gwBP58');
                    }, "Click share icon. ");
                })
            .waitForElementVisible('#react-autowhatever-region--item-0', timeouts.animation)
            .click('#react-autowhatever-region--item-0')
             .waitForElementVisible('._4qhIn2-ESi.Pjv3h3YbYr.THqSbzx07u', timeouts.animation)
            .click('._4qhIn2-ESi.Pjv3h3YbYr.THqSbzx07u')
            .end()
    },
    'login': function(browser){
       
        loginlol.login(browser);
    }
}