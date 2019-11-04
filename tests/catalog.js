var connect = require('./connect');

function moreBuy(browser){
    let result = 0;
    browser.click('._4qhIn2-ESi._2sJs248D-A._18c2gUxCdP._3hWhO4rvmA').pause(2000).getText('._1u3j_pk1db._1pTV0mQZJz._29G9cgzIkc._1JLs4_hnVR', res2 => {
            result = +res2.value.replace(' ₽', '').replace(' ', '');
            if(result < 2999){
                moreBuy(browser);
            }else{
                return result;
            }
    })
}

function priceToNumber(val){
    return +val.replace(' ₽', '').replace(' ', '');
}

module.exports = {
    'connect':function(browser){
        connect.connect(browser, 'https://beru.ru/')
    },

    catalog: function(browser){
        const menu = {
            openMenu: '[data-tid="71e1c78d 37df3efd"]',
            firstChild: 'a[href="/catalog/krasota-i-gigiena-v-saratove/77088?hid=90509&track=menu"]',
            teeth: 'a[href="/catalog/elektricheskie-zubnye-shchetki-v-saratove/80961/list?hid=278374&track=menuleaf"]',
        }
        const filters  = {
            min: '[placeholder="432"]',
            max: '[placeholder="23 589"]',
            pagination: '.n-pager-more__button',
            maxVal:1999,
            minVal:999,
            delievery: 2499
        }
        const cards = {
            items: '._1u3j_pk1db._1pTV0mQZJz',
            cart: '[href="/my/cart"]',
            buyButton: '._4qhIn2-ESi._3OWdR9kZRH.THqSbzx07u'
        }
        const timeouts = {
            request: 5000,
            pause: 2000,
            animate: 500,
        }
        const values = {
            h1: 'Электрические зубные щетки',
            freeText:'бесплатную доставку',
        }
        const prices = {
            leftPrice: '._1u3j_pk1db._1pTV0mQZJz._29G9cgzIkc._1JLs4_hnVR',
            free: '.voCFmXKfcL._1O0RrvwYg5',
            rightPrice:'._1oBlNqVHPq',
            sailSum: '.voCFmXKfcL'
        }

        browser.click(menu.openMenu)

        .moveToElement(menu.firstChild, 20, 20, function() {
            browser.waitForElementVisible(menu.teeth, timeouts.animate, function () {
                browser.click(menu.teeth);
            }, "focused!!!");
        })
        .waitForElementVisible('h1', timeouts.request, () => {
            browser.getText('h1', result => {
                browser.assert.equal(result.value, values.h1);
            })
        })
        .setValue(filters.min, filters.minVal)
        .setValue(filters.max, filters.maxVal)
        .pause(2000)
        .click(filters.pagination)
        .pause(2000)
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
        .elements('', cards.buyButton, res=>{
            const els = res.value;
            browser.elementIdClick(els[0].ELEMENT);
        })
        .pause(timeouts.pause)
        .click(cards.cart)
        .waitForElementVisible(prices.sailSum, timeouts.request)
        .getText(prices.sailSum, res=>{
            const result = priceToNumber(res.value);
            browser.getText(prices.rightPrice, res2 => {
                const result2 = priceToNumber(res2.value);
                browser.verify.equal(filters.delievery, result + result2)
            })
        })
        .getText(prices.leftPrice, () => {
            moreBuy(browser)
        })
        .waitForElementVisible(prices.free,  timeouts.request)
        .getText(prices.free, res => {
            browser.assert.equal(res.value, values.freeText)
        })
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
