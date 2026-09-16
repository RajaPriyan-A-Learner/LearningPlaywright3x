import {test,expect} from '@playwright/test';

test('Login to the herokuapp',async ({page})=>{
    await page.goto("https://katalon-demo-cura.herokuapp.com/",{
        waitUntil: "domcontentloaded"
    });
    await page.locator("#btn-make-appointment").click();
    let username=await page.getByPlaceholder('Username').first().inputValue();
    let password=await page.getByPlaceholder('Password').first().inputValue();
    await page.locator('#txt-username').fill(username);
    await page.locator('#txt-password').fill(password);
    await page.locator('#btn-login').click();
    const makeAppointmentHeader = page.locator('#appointment h2');
    await expect(makeAppointmentHeader).toHaveText("Make Appointment");
});