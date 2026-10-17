# 301_cart_add_assertion — End-to-End POM with Multi-Page Flow & Step Screenshots

**File:** `29_Playwright/e2e_tests/20_Page_Object_Model/301_cart_add_assertion.spec.ts`

## Overview

This spec demonstrates a realistic **multi-page POM workflow**: login → inventory → add to cart → navigate to cart → assert item. It uses three page objects (`LoginPage`, `Inventorypage`, `Cartpage`) together for the first time, and introduces `test.step()` with screenshot helpers for structured, debuggable test reports. It is the most complete end-to-end example in this sub-chapter.

---

## Main Concept

Real applications require navigating across multiple pages. POM solves the multi-page problem by providing a separate class for each screen. The spec composes them: it creates all three page objects at the top of the test, then uses each one in the step that corresponds to its page. The `shot()` utility captures screenshots at every step, embedding visual proof in the HTML report.

The key data-flow pattern: `addFirstItemToCart()` **returns the item name** so the cart assertion can verify the exact same product was preserved through navigation.

### Code Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { Inventorypage } from './pages/InventoryPage';
import { Cartpage } from './pages/CartPages';
import { shot } from '../../utils/stepScreenshot';

test('add first item to cart and verify it in the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new Inventorypage(page);
    const cartPage = new Cartpage(page);
    let itemName = '';

    await test.step('open the login page', async () => {
        await loginPage.goto();
        await shot(page, 0, 'login page');
    });

    await test.step('login as standard_user', async () => {
        await loginPage.login('standard_user', 'tta_secret');
        await expect(inventoryPage.title).toHaveText('Products');
        await shot(page, 1, 'inventory');
    });

    await test.step('add the first item to the cart', async () => {
        itemName = await inventoryPage.addFirstItemToCart();
        await shot(page, 2, 'item added');
    });

    await test.step('open the cart', async () => {
        await inventoryPage.openCart();
        await expect(cartPage.title).toHaveText('Your Cart');
        await shot(page, 3, 'cart');
    });

    await test.step('verify the item is in the cart', async () => {
        await expect(cartPage.itemName).toHaveText(itemName);
        await expect(cartPage.checkout).toBeVisible();
        await shot(page, 4, 'verified');
    });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

**Line-by-line Explanation:**

- `Lines 1–5`: Four imports — Playwright, three page object classes, and the `shot` utility. Each import signals a clear separation of concern: framework, pages, helpers.
- `Lines 8–10`: All three page objects are constructed immediately. This is intentional — constructors are cheap (they just wire locators), and instantiating them up-front makes the test structure readable: you can scan the top and know exactly which pages are involved.
- `Line 11`: `let itemName = ''` is declared at test scope so it can be set inside one step and read inside another. This is the canonical way to share data across `test.step` closures.
- `Lines 13–16`: `test.step('open the login page')` — wraps the navigation in a named step. The Playwright HTML report shows each step as a collapsible row with its own duration and screenshots.
- `Line 15`: `shot(page, 0, 'login page')` — captures `test-results/screenshots/0_login_page.png`. The numeric prefix ensures alphabetical = chronological ordering.
- `Lines 18–22`: The second step calls `loginPage.login()` and immediately asserts `inventoryPage.title` has text `'Products'`. The assertion uses the **destination page object's locator** — because after login you are on the inventory page. This cross-page assertion is possible because locators are lazy; `inventoryPage.title` does not query the DOM until `toHaveText` triggers it.
- `Lines 24–27`: `addFirstItemToCart()` is the key method — it reads the item name, clicks Add to Cart, and returns the name. Storing it in `itemName` is the data handoff that makes the final assertion possible.
- `Lines 29–33`: `openCart()` clicks the cart link. The assertion uses `cartPage.title` to confirm the navigation succeeded before proceeding.
- `Lines 35–39`: The final assertions verify the cart contains the exact item added (`toHaveText(itemName)`) and that the Checkout button is visible. Both use `Cartpage` locators — the test itself never touches a `page.locator()` call.

**Why this approach was chosen:**

The coder wraps each navigation action in `test.step()` to produce a structured HTML report where each step is independently collapsible, timestamped, and screenshot-annotated. Without steps, a failure anywhere in the test shows one flat error with no visual context. With steps, the report shows exactly which step failed and what the page looked like at that moment.

The `addFirstItemToCart()` return value pattern avoids fragile workarounds like `page.locator(...).innerText()` inside the assertion step — instead, the page object captures the name at the moment of action and hands it back to the test cleanly.

**Alternative Effective Way:**

Use `test.beforeEach` to handle login for all tests in the file, and `storageState` to skip re-logging-in entirely:

```typescript
// playwright.config.ts
export default defineConfig({
    use: { storageState: 'auth.json' }
});

// Global setup: log in once and save session to auth.json
// Then every test starts already authenticated — the login step disappears.
```

For screenshot capture, use Playwright's built-in `screenshot` option in `playwright.config.ts` to capture on failure automatically, removing the need for manual `shot()` calls in every step.

---

## Common Mistakes

- **Sharing state via module-level variables** instead of test-scoped `let` — causes test pollution when tests run in parallel.
- **Asserting on a locator from the wrong page object** — e.g., using `loginPage.emailInput` after login succeeds.
- **Not returning data from page methods** — forces the test to re-query the DOM (`innerText()` inside the spec), leaking selector knowledge.
- **Skipping `test.step()`** for long tests — a single flat test body with 10+ `await` calls produces an unreadable failure message.
- **Using `page.screenshot()` without a structured path** — screenshots overwrite each other if the filename is not unique per step.

---

## Summary

**Key Takeaway:** Multi-page POM is about **composition** — one page object per screen, all sharing the same `page` instance, each owning only its own locators and actions. The test reads like a user story; the page objects handle every selector detail. Adding `test.step()` + screenshots transforms a passing green tick into a fully auditable visual report.
