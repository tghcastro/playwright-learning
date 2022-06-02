const {test, expect} = require('@playwright/test')

const wrongUsername = 'rahulshetty'
const correctUsername = 'rahulshettyacademy'
const siteUrl = 'https://www.rahulshettyacademy.com/loginpagePractise/' 

test('Setting browser context test', async ({browser})=> {
    // It's possible to set Cookies and other bowser using context
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(siteUrl)
    console.log(await page.title())
    await expect(page).toHaveTitle('Wrong title to make test fail')
})

test('Default browser context test', async ({page}) => {
    // Context from previous test is the default configuration
    await page.goto(siteUrl)
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
})

test('Signin with wrong credentials', async ({page}) => {
    await page.goto(siteUrl)
    
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


test('Signin with correct credentials', async ({page}) => {
    await page.goto(siteUrl)
    
    const username = await page.locator('#username')
    await username.type(wrongUsername)

    const password = await page.locator('#password')
    await password.type('learning')

    const signinButton = await page.locator('#signInBtn')
    await signinButton.click()

    const  errorMessage = page.locator("[style*='block']")
    console.log("Error message: " + await errorMessage.textContent())
    await expect(errorMessage).toContainText("Incorrect username/password.")

    await username.fill(correctUsername) // fill method replaces previously written content
    await signinButton.click()

    const top = page.locator('body > app-root > app-navbar > div > nav > a')
    await expect(top).toContainText('ProtoCommerce')
    
})