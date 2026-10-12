# 07_WebTables_FlipKart — E-Commerce Pagination & Table Scraper

**File:** `29_Playwright/e2e_tests/07_WebTables/FlipKart.spec.ts`

## Overview
This test script demonstrates automated pagination traversal and multi-item attribute extraction on Flipkart. It navigates to an e-commerce search results page, dismisses overlays, fills a search query ("DSLR Camera"), and enters an infinite `while` loop that scrapes product names and prices across multiple paginated pages until reaching the terminal page.

---

## Main Concept
Dynamic data grids and e-commerce listings often distribute information across multiple pages without traditional HTML `<table>` tags, relying instead on CSS grid and flexbox cards. Automating data extraction requires combining locator queries with dynamic DOM polling, pagination link interception, and safe loop termination when the next page link is missing or unnavigable.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test('Fetch the Camera results from Flipkart site', async ({ page }) => {
    await page.goto('https://www.flipkart.com/', {
        waitUntil: 'domcontentloaded'
    });

    await expect(page.locator("[data-id='stickyElement']")).toBeVisible();
    await page.locator('body').press('Escape');
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
        } else {
            await nextButton.click();
        }

        const href = await nextButton.getAttribute('href');
        if (!href) { console.log('Last page'); break; }

        await page.goto(new URL(href, page.url()).toString(), { waitUntil: 'domcontentloaded' });
        await expect(cards.first()).toBeVisible();
    }
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `FlipKart.spec.ts`

**Line-by-line Explanation:**
*   `Line 1`: Imports `test` and `expect` fixtures from `@playwright/test`.
*   `Line 4-7`: Launches the test block and opens `https://www.flipkart.com/` using `{ waitUntil: 'domcontentloaded' }` to avoid waiting for heavy media/ads to finish loading.
*   `Line 9-10`: Waits for the sticky header element and presses `Escape` on the `body` locator to dismiss any initial login modal popup.
*   `Line 11-14`: Confirms the search input `[name='q']` is editable, focuses it, types "DSLR Camera", and triggers search execution via keyboard `Enter`.
*   `Line 16-17`: Locates product card containers matching prefix `DLL` and asserts visibility of the first result card before proceeding.
*   `Line 19`: Declares a semantic locator for the pagination "Next" anchor link using `page.getByRole('link', { name: 'Next' })`.
*   `Line 21-34`: In an extraction loop, waits for product titles (`div.RG5Slk`), extracts all title and price texts in bulk using `allInnerTexts()`, and logs each numbered pair to standard output.
*   `Line 35-41`: Checks if the "Next" button exists in the DOM. If not, logs completion and exits the loop; otherwise clicks the button.
*   `Line 43-48`: Checks for an `href` attribute on the Next link, formats the absolute destination URL, navigates explicitly, and waits for cards to re-render.

**Why this approach was chosen:**
The coder chose `allInnerTexts()` to minimize cross-process round trips between Playwright and Chromium, retrieving arrays of strings in batch rather than making N individual IPC calls. They used `waitUntil: 'domcontentloaded'` because public retail sites have endless marketing beacons and third-party trackers that prevent `networkidle` or `load` from ever completing before the default 30s timeout.

**Alternative Effective Ways:**
Instead of manual `while(true)` loops and extracting raw text strings, an alternative effective way is to structure the scraping using custom web-first page object abstractions or intercepting the internal GraphQL / REST catalog API response (`page.waitForResponse(...)`). Furthermore, the double action of `await nextButton.click()` followed by manual `await page.goto(href)` causes double navigation; relying purely on `await nextButton.click()` with `await expect(cards.first()).not.toHaveText(...)` or waiting for the network response provides cleaner, deterministic synchronization without race conditions.

---

### Key Points
- Use `allInnerTexts()` or `allTextContents()` for batch retrieval of lists instead of looping with individual `.nth(i).innerText()` calls.
- `press('Escape')` on `body` is an effective strategy to clear blocking modal backdrops.
- Always implement explicit termination criteria in pagination loops to prevent infinite timeouts.

---

## Common Mistakes
- Relying on `page.waitForLoadState('load')` or `networkidle` on busy public e-commerce sites, which frequently triggers timeout failures.
- Clicking the next link and simultaneously issuing a manual `page.goto(href)` without waiting for the previous navigation to settle.
- Using fragile auto-generated CSS class names (e.g., `div.RG5Slk`) that change across weekly frontend deployments; prefer `getByRole` or stable data attributes.

---

## Summary
**Key Takeaway:** Real-world e-commerce data extraction combines fast DOM-loaded navigation, resilient overlay dismissal, batch text scraping with `allInnerTexts()`, and deterministic pagination loop bounds.
