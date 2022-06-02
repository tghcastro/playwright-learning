const {test, expect} = require('@playwright/test')

test('Setting browser context test', async ({browser})=> {
    // It's possible to set Cookies and other bowser using context
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title())
    await expect(page).toHaveTitle('Wrong title to make test fail')
})

test('Default browser context test', async ({page}) => {
    // Context from previous test is the default configuration
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
})

test('Signin with wrong credentials', async ({page}) => {
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    
    const wrongUsername = 'rahulshetty'

    const username = await page.locator('#username')
    await username.type(wrongUsername)

    const password = await page.locator('#password')
    await password.type('learning')

    await page.locator('#signInBtn').click()

    const  errorMessage = page.locator("[style*='block']")
    console.log("Error message: " + await errorMessage.textContent())
    await expect(errorMessage).toContainText("Incorrect username/password.")
})