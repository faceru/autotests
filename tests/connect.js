module.exports = {
    'connect': function(browser, url){
        browser.url(url, () => {
                console.log(`Loading ${url}`);
        })
       
    }
}