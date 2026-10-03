const { test, expect, request } = require('@playwright/test')
const loginPayload = { userEmail: "priyanka.bstm@gmail.com", userPassword: "Apple93396" };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let token;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload

        })//200, 201

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponsejson = await loginResponse.json();
    const token = loginResponsejson.token;
    console.log(token);





});


//Network intercepting response call with playwright route method
test('Place the Order', async ({ page }) => {

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

        async route => {

            const response = page.request.fetch(route.request());
            const fakePayLoadOrders = { data: [], message: "No Orders" };
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(

                {

                    response,
                    body,

                });

            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end

        });



    await page.locator("button[routerlink*='myorders']").click();
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());



});

