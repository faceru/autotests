var connect = require('./connect');

// parse sum to int
function priceToNumber(val){
    return +val.replace(' ₽', '').replace(' ', '');
}

// add more cards in cart with counter
function moreBuy(browser){
    let result = 0;
    browser.getText('[data-auto="price"] span', res => {
        result = priceToNumber(res.value);
    }).click('._4qhIn2-ESi._2sJs248D-A._18c2gUxCdP._3hWhO4rvmA').pause(2000).getText('[data-auto="price"] span', res2 => {
            
            if(priceToNumber(res2.value) < 2999 && priceToNumber(res2.value) !== result){ 
                moreBuy(browser);
            }else{
                return result;
            }
    })
}



module.exports = {
    'connect':function(browser){
        connect.connect(browser, 'https://beru.ru/')
    },

    catalog: function(browser){
        // selectors
        const menu = {
            openMenu: '[data-tid="71e1c78d 37df3efd"]',
            firstChild: 'a[href="/catalog/krasota-i-gigiena-v-saratove/77088?hid=90509&track=menu"]',
            teeth: 'a[href="/catalog/elektricheskie-zubnye-shchetki-v-saratove/80961/list?hid=278374&track=menuleaf"]',
        }

        const filters  = {
            min: '[data-auto="filter-range-min"] input',
            max: '[data-auto="filter-range-max"] input',
            pagination: '[data-auto="pager-more"]',
            maxVal:1999,
            minVal:999,
            delievery: 2499
        }
        const cards = {
            items: '._1u3j_pk1db',
            cart: '[href="/my/cart"]',
            buyButton: '._1qP8FdsgOD button'
        }
        const timeouts = {
            request: 5000,
            pause: 2000,
            animate: 500,
        }
        const values = {
            h1: 'Электрические зубные щетки',
            freeText:'Поздравляем! Вы получили бесплатную доставку на ваш заказ',
        }
        const prices = {
            leftPrice: '[data-auto="price"] span',
            free: '[data-auto="remainder-description"]',
            rightPrice:'._1oBlNqVHPq',
            sailSum: '._2YHTmhZmt4'
        }

        // open dropdown menu
        browser.click(menu.openMenu)

        // hover first category  of menu
        .moveToElement(menu.firstChild, 20, 20, function() {
            // hover our teeth menu item and click
            browser.waitForElementVisible(menu.teeth, timeouts.animate, function () {
                browser.click(menu.teeth);
            }, "focused!!!");
        })
        // check page teeth category was open
        .waitForElementVisible('h1', timeouts.request, () => {
            browser.getText('h1', result => {
                browser.assert.equal(result.value, values.h1);
            })
        })
        // set min price value
        .setValue(filters.min, filters.minVal)
        // set max price value
        .setValue(filters.max, filters.maxVal)
        // w8 for request
        .pause(timeouts.pause)
        // open full items page
        .click(filters.pagination)
        // w8 for request
        .pause(timeouts.pause)
        // check our cards with teeths for filters work
        .elements('', cards.items, res=>{
           const els = res.value;
           els.forEach(function(el){
                browser.elementIdText(el.ELEMENT, function(text) {
                   const result = priceToNumber(text.value);
                   const boolRes = result >= filters.minVal && result <= filters.maxVal;
                   browser.verify.equal(true, boolRes)
                });
           })
        })
        // add in cart first item of cards
        .elements('', cards.buyButton, res=>{
            const els = res.value;
            browser.elementIdClick(els[0].ELEMENT);
        })
        // w8 for request
        .pause(timeouts.pause)
        // going for cart
        .click(cards.cart)
        // check cart page
        .waitForElementVisible(prices.sailSum, timeouts.request)
        // check sail sum with price sum
        .getText(prices.sailSum, res=>{
            const result = priceToNumber(res.value);
            browser.getText(prices.rightPrice, res2 => {
                const result2 = priceToNumber(res2.value);
                browser.verify.equal(filters.delievery, result + result2)
            })
        })
        // add more cards before price sum more then sail sum
        .getText(prices.leftPrice, () => {
            moreBuy(browser)
        })
        // w8 for request
        .waitForElementVisible(prices.free,  timeouts.request)
        // check for free
        .getText(prices.free, res => {
            browser.assert.equal(res.value, values.freeText)
        })
        // check sail sum with price sum again
        .getText(prices.rightPrice, res => {
            const result = priceToNumber(res.value);
            browser.getText(prices.leftPrice, res2=>{
                const result2 = priceToNumber(res2.value);
                browser.assert.equal(result, result2)
            })
        })

    },

    breakTest: function(browser){
        browser.end()
    }
}
