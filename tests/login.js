module.exports = {
    'beru.ru - login': function(browser){
        //constants
        const login = {
            button:'._3ioN70chUh._1FEpprw_Km._3Uc73lzxcf',
            input: '#passp-field-login',
            value: process.env.YANDEX_LOGIN
        }
        const password = {
            selector:'[type="password"]',
            value:process.env.YANDEX_PASSWORD
        }
        const loginSuccess = {
            profileSelector: '.pFhTbV17qj',
            headerTextSelector: '._1G9kMUZOVq'
        }
        const timeouts = {
            request: 5000,
            animation: 3000
        }
        //start tests
        browser.
            url('https://beru.ru/', () => {
                console.log('Loading ber.ru');
            })
            .waitForElementVisible(login.button, timeouts.request)//wait for login buttin
            .click(login.button) //redirect to login
            .waitForElementVisible(login.input, timeouts.request) //wait for loading login page
            .setValue(login.input, login.value) //set login value
            .getValue(login.input, result => { //check login value for setting
                      browser.assert.equal(result.value, login.value);
            })
            .submitForm('form') //submit login
            .waitForElementVisible(password.selector, timeouts.request)//wait for success login submitting
            .setValue(password.selector, password.value) //set password
            .getValue(password.selector, result => { //check pass was setting
                browser.assert.equal(result.value, password.value);
            })
            .submitForm('form') //submit password
            .waitForElementVisible(loginSuccess.headerTextSelector, timeouts.request) //wait for success pass sub
            .getAttribute(loginSuccess.profileSelector, 'textContent', result => { //check login success
                browser.assert.equal(result.value, 'Мой профиль');
                console.log('Авторизация прошла успешно');
            })
            .end();
           
            
    }
    
  };