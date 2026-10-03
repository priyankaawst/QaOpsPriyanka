const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Browser Context client app test', async ({ browser }) => {

    const context = await browser.newContext();
    const Page = await context.newPage();
    const products = Page.locator('.card-body');
    const productName = "ZARA COAT 3";

    await Page.goto("https://rahulshettyacademy.com/client");
    await Page.locator('input#userEmail').fill("priyanka.bstm@gmail.com");
    await Page.locator("[type='password']").fill("Apple93396");
    await Page.locator('input#login').click();
    await Page.waitForLoadState(('networkidle'));
    await Page.locator(('.card-body b')).first().waitFor();

    const tilles = await Page.locator('.card-body b').allTextContents();
    console.log(tilles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        const name = await products.nth(i).locator("b").textContent();
        console.log(name);
        if (name === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }

        //await Page.pause();


    }

    await Page.locator("[routerlink='/dashboard/cart']").click();
    await Page.locator("div li").first().waitFor();
    const bool = await Page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await Page.locator("text=Checkout").click();
    await Page.locator("[placeholder='Select Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = await Page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {

        const text = await dropdown.locator("button").nth(i).textContent();

        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;

        }

        //await Page.pause();

    }

    expect(await Page.locator("//label[text()='priyanka.bstm@gmail.com']")).toHaveText("priyanka.bstm@gmail.com");
    await Page.locator(".action__submit ").click();
    await expect(Page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await Page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();





});
