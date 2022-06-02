const {test} = require('@playwright/test')

test('Setting browser context test', async ({browser})=> {
    // It's possible to set Cookies and other bowser using context
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
})

test('Default browser context test', async ({page}) => {
    // Context from previous test is the default configuration
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
})