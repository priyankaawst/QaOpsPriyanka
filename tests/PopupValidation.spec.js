import { test, expect } from '@playwright/test';
import { asyncWrapProviders } from 'node:async_hooks';

test('Popup Validations', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    //Java aleart Pop up
    await page.on('dialog', dialog => dialog.accept());//it will accept the popup
    await page.on('dialog', dialog => dialog.dismiss());//it will dismiss the popup
    await page.locator("#confirmbtn").click();
    //Mouse hover on any menu button
    await page.locator("#mousehover").hover();
    //Handle frames in Playwright
    const frames = page.locator("iframe[name='courses-iframe']");
    await frames.locator("li a[href*='lifetime-access']:visible").click();
    

    const text = await frames.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);










});















