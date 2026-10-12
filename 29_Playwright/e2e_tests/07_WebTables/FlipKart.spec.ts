import { test, expect } from '@playwright/test';


test('Fetch the Camera results from Flipkart site', async ({ page }) => {
    await page.goto('https://www.flipkart.com/', {
        waitUntil: 'domcontentloaded'
    });

    await expect(page.locator("[data-id='stickyElement']")).toBeVisible();
    await page.locator('body').press('Escape');   // targets the page explicitly, waits for body
    await expect(page.locator("[name='q']").first()).toBeEditable();
    await page.locator("[name='q']").first().click();
    await page.locator("[name='q']").first().fill("DSLR Camera");
    await page.keyboard.press("Enter");

    const cards = page.locator("div[data-id^='DLL']");
    await expect(cards.first()).toBeVisible();

    const nextButton = page.getByRole('link', { name: 'Next' });

    while (true) {
        let count = 0;

        const productName = page.locator('div.RG5Slk');
        await expect(productName.first()).toBeVisible();
        const productPrice = page.locator('div.hZ3P6w.DeU9vF');
        await productName.first().isVisible();
        const productNames = await productName.allInnerTexts();
        const productPrices = await productPrice.allInnerTexts();
        count = productNames.length;
        for (let i = 1; i <= count; i++) {
            console.log(`The Product Number:${i} - ${productNames[i - 1]}::${productPrices[i - 1]} `);
        }

        if (await nextButton.count() === 0) {
            console.log('The user reached the last page');
            break;
        }
        else {
            await nextButton.click();
        }

        const href = await nextButton.getAttribute('href');
        if (!href) { console.log('Last page'); break; }

        await page.goto(new URL(href, page.url()).toString(), { waitUntil: 'domcontentloaded' });
        await expect(cards.first()).toBeVisible();
    }



});