const{test, expect}=require('@playwright/test');

test('Browser Context UI Control Test', async({browser})=>
{
    

      const context = await browser.newContext();
      const Page = await context.newPage();
      const userName = Page.locator('input#username');
      const password = Page.locator("[type='password']");
      const signInBtn = Page.locator('input#signInBtn');
      const documentLink=Page.locator("[href*='documents-request']");

      await Page.goto("https://rahulshettyacademy.com/loginpagePractise/");

      await userName.fill("rahulshettyacademy");
      await password.fill("Learning@830$3mK2");
      const dropdown = Page.locator('select.form-control');
      dropdown.selectOption('consult');
      await Page.locator('span.radiotextsty').last().click();
      await Page.locator('button#okayBtn').click();
      console.log(await Page.locator('span.radiotextsty').last().isChecked()); 
      await expect (Page.locator('span.radiotextsty').last()).toBeChecked();
      await Page.locator('input#terms').click();
      await expect (Page.locator('input#terms')).toBeChecked();
      await Page.locator('input#terms').uncheck();
       expect(await Page.locator('input#terms').isChecked()).toBeFalsy();
       //ToHaveAttribute() methaod is used to validate the attribute of the element. 
       // In this case we are validating the class attribute of the document link.
       await expect(documentLink).toHaveAttribute('class', 'blinkingText');
         await Page.pause();


});

test.only('Child Window handle', async({browser})=>
{
    const context = await browser.newContext();
    const Page = await context.newPage();
     const userName = Page.locator('input#username');
     const documentLink=Page.locator("[href*='documents-request']");
      await Page.goto("https://rahulshettyacademy.com/loginpagePractise/");

      const [newPage]= await Promise.all([
      context.waitForEvent('page'),
      documentLink.click()
]);

    const text = await newPage.locator("[class='im-para red']").textContent();
    console.log(text);
    const arrayText=text.split("@");
    const domain =arrayText[1].split(" ")[0];

    console.log(domain);
     await Page.locator('input#username').fill(domain);
     console.log(await Page.locator('input#username').textContent());





});