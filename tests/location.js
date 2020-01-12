var connect = require('./connect');
var login = require('./login');

module.exports = {
    'connect':function(browser){
        connect.connect(browser, 'https://beru.ru/')
    },
    'location': function(browser) {
        // selectors
        const region = {
            opener:'[data-auto="region-form-opener"]'
        }
        modal = {
            modal:'[data-auto="modal"]',
            chooseFirstSelector: '#react-autowhatever-region--item-0',
            subModal: '._4qhIn2-ESi.Pjv3h3YbYr.THqSbzx07u',
            inputContainer:'._2JDvXzYsUI',
            inputDiv: '._8iW7gwBP58',
            input: '._8iW7gwBP58 input._2JDvXzYsUI',
            clearButton: '._8iW7gwBP58 button'
        }
        const timeouts = {
            request: 5000,
            animation: 3000
        }
        const city = {
            hv: 'Хвалынск'
        }
    
        browser
            .waitForElementVisible(region.opener, timeouts.request)
            .click(region.opener)
            .waitForElementVisible(modal.modal, timeouts.animation) 
            .moveToElement(modal.inputContainer, 100, 100, function() {
                    browser.waitForElementVisible(modal.inputContainer, 500, function () {
                       
                        browser.click(modal.inputDiv)
                        .waitForElementVisible(modal.clearButton, 1000)
                        .click(modal.clearButton)
                    }, "focused!!!");
            })
            
            .setValue(modal.input, city.hv)
        
            .waitForElementVisible(modal.chooseFirstSelector, timeouts.animation)

            .click(modal.chooseFirstSelector)
             .waitForElementVisible(modal.subModal, timeouts.animation)
            .click(modal.subModal)
            .getText(region.opener, result => {
                browser.verify.equal(result.value, `Город: \n${city.hv}`);
            })
            
    },
    'auth': function(browser){
        login.login(browser)
    },
    'citytest' : function(browser){
        
        browser.moveToElement('[data-zone-name="HeaderUserBadge"]', 20, 20, function() {
            browser.waitForElementVisible('._2ubPaMe58x._3ZZzYB8tbn', 500, function () {
                browser.click('[href="/my/settings?track=menu"]');
            }, "hovered!!!");
        })
        .getText('[data-auto="region-form-opener"].zB1fta3NQ5', result => {
            browser.getText('[data-auto="region"]', res=>{
                browser.verify.equal(result.value, res.value);
            })
        })
    },

    'breakTest':function(browser){
        login.breakTest(browser)
    }
}