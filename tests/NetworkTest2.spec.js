const{test,expect} = require ('@playwright/test');

test('Security test request intercept', async({page})=>

{
  //login and reach orders page

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('input#userEmail').fill("priyanka.bstm@gmail.com");
    await page.locator("[type='password']").fill("Apple93396");
    await page.locator('input#login').click();
    await page.waitForLoadState(('networkidle'));
    await page.locator(".card-body b").first().waitFor();
 
    await page.locator("button[routerlink*='myorders']").click();


   //How to intercept network request call in playwright
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
     route => route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
     await page.locator("button:has-text('View')").first().click();
     await page.pause();
     await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");   
    



});