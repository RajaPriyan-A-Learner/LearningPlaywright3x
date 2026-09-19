import {test, expect} from '@playwright/test';


test('Validate the error for wingify app',async({page})=>{
    await page.goto("https://wingify.com/free-trial/",
        {
            waitUntil: "domcontentloaded"
        }
    )
    await expect(page).toHaveURL("https://wingify.com/free-trial/");
    await page.locator("//input[@class='WInput']").fill("abcded");
    await page.locator("//label[@for='free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox']/../input[2]").click();
    await page.locator("//label[@for='free-trial-step1-gdpr-consent-checkboxcu-gdpr-consent-checkbox']/../input[1]").click();
    await page.locator("//a[text()='Terms']//following::button[1]").nth(0).click();
    const errorMessage=page.locator("//input[contains(@class,'WInput')]//following::div[1]").nth(0);
    await expect(errorMessage).toHaveText("The email address you entered is incorrect.");

});