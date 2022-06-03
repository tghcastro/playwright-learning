const {test, expect} = require('@playwright/test')

test('Browser wait dynamically in service based applications - without wait for load state', async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("anshika@gmail.com")
    await page.locator("#userPassword").type("Iamking@000")
    await page.locator("[value='Login']").click()

    const productTitles = await page.locator(".card-body b").allTextContents() // allTextContents doesn't have an auto wait
    console.log(productTitles) 
    expect(productTitles).toHaveLength(0)
})

test('Browser wait dynamically in service based applications - waiting for load state', async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("anshika@gmail.com")
    await page.locator("#userPassword").type("Iamking@000")
    await page.locator("[value='Login']").click()

    // Waiting to API calls to finish with success - network to be idle
    await page.waitForLoadState('networkidle')

    const productTitles = await page.locator(".card-body b").allTextContents() // allTextContents doesn't have an auto wait
    console.log(productTitles) 
    expect(productTitles).toHaveLength(4)
})