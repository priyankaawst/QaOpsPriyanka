const {test, expect}=require('@playwright/test');
const { log } = require('node:console');

  test('Browser Context playwright test', async ({browser})=> 
  {

         const context = await browser.newContext();
         const page = await context.newPage();
         //How to abort the network calls by using route.abort() method
        // page.route('**/*.css',route=> route.abort());
         //page.route('**/*.{jpg,png,jpeg}',route=> route.abort());

         const cardTitles=page.locator(".card-body a");
         await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
         console.log( await page.title());
        await expect (page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

        //css
        await page.locator('input#usename').fill('rahulshettyacademy');
        await page.locator("[type='password']").fill('Learning@830$3mK2');
        await page.locator('#signInBtn').click();
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = (await cardTitles.allTextContents());
        console.log(allTitles);
        //textcontent() method is used to fetch the text from browser
        //console.log(await page.locator("[style*='block']").textContent());
        //await expect(page.locator("[style*='block']")).toContainText("Incorrect");



  });


 /* test('Page playwright test', async ({page})=>
  {

        await page.goto("https://google.com ");

        console.log(await page.title());
        await expect (page).toHaveTitle("Google");

  });*/