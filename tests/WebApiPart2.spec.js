const { test, expect } = require('@playwright/test');
let webContext;
//How to save the session storage and inject into new browser context
test.beforeAll(async({browser})=>
{

    const context = await browser.newContext();
    const Page = await context.newPage();
    await Page.goto("https://rahulshettyacademy.com/client");
    await Page.locator('input#userEmail').fill("priyanka.bstm@gmail.com");
    await Page.locator("[type='password']").fill("Apple93396");
    await Page.locator('input#login').click();
    await Page.waitForLoadState(('networkidle'));
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});



});

//How to save the session storage and inject into new browser
test('Client app login', async () => {

    //const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await Page.goto("https://rahulshettyacademy.com/client");
    const products = Page.locator('.card-body');
    
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

        


    }

   

});

test('Test case 2', async () => {

    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await Page.goto("https://rahulshettyacademy.com/client");
    const products = Page.locator('.card-body');
    
    await Page.locator(('.card-body b')).first().waitFor();

    const tilles = await Page.locator('.card-body b').allTextContents();
    console.log(tilles);

});