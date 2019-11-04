module.exports = {
    'connect': function(browser, url){
        browser.url(url, () => {
                console.log(`Loading ${url}`);
        })
        // .deleteCookies(res=>{
        //     console.log('cookies was deleted', res)
        // })
        // .pause(5000)
    }
}