module.exports = {
    'beru.ru - login': function(browser){
        const loginButton = '._3ioN70chUh._1FEpprw_Km._3Uc73lzxcf';
        browser.
            url('https://beru.ru/', () => {
                console.log('Loading ber.ru');
            })
            .waitForElementVisible(loginButton, 5000)
            .click(loginButton)
            .waitForElementVisible('#passp-field-login', 5000)
            .setValue('#passp-field-login', 'autotestsrogov')
            .getValue('#passp-field-login', result => {
                      browser.assert.equal(result.value, 'autotestsrogov');
            })
            .submitForm('form')
            .waitForElementVisible('[type="password"]', 5000)
            .setValue('[type="password"]', 'autotestsrogov!23')
            .getValue('[type="password"]', result => {
                browser.assert.equal(result.value, 'autotestsrogov!23');
            })
            .submitForm('form')
            .waitForElementVisible('._1G9kMUZOVq', 10000)
            .getAttribute('.pFhTbV17qj', 'textContent', res => {
                browser.assert.equal(res.value, 'Мой профиль');
                console.log('Авторизация прошла успешно');
            })
            .end();
           
            
    }
    
  };