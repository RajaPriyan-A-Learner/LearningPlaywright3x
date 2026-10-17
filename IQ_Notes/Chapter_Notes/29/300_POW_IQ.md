# 300_POW — Minimal Page Object Model (Login Only)

**File:** `29_Playwright/e2e_tests/20_Page_Object_Model/300_POW.spec.ts`

## Overview

This spec is the first POM-based test in the sub-chapter. It imports a `LoginPage` class and uses only its two methods — `goto()` and `login()` — to complete the entire login flow. The test body becomes a readable script of intent, with zero knowledge of how the login form is structured in the DOM. It is the direct **after** counterpart to `299_No_POM.spec.ts`.

---

## Main Concept

The **Page Object Model** pattern separates *what to do* (test intent) from *how to do it* (selector and interaction details). The test says `loginPage.login("standard_user", "tta_secret")` — it does not know which HTML element, which `data-test` attribute, or which input type is used. That knowledge lives exclusively in `LoginPage.ts`.

### Code Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('POM with Login Page Simple', () => {
    test('Login with valid credns', async ({ page }) => {

        // Without POM (commented out to show contrast):
        // await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
        // await page.getByRole("textbox", { name: "Username" }).fill(...);

        // With POM:
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user", "tta_secret");
        await expect(page).toHaveTitle("TTACart - Login");
    });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

**Line-by-line Explanation:**

- `Line 1`: Standard Playwright import. Only `test` and `expect` — no locator helpers needed in the spec because the page object owns them.
- `Line 2`: `import { LoginPage }` — the spec declares a typed dependency on its page object. TypeScript ensures the method signatures match at compile time.
- `Lines 4–6`: `test.describe` groups related tests. Even with a single test here it is good hygiene — describe blocks appear as sections in the HTML report.
- `Lines 7–10`: The commented-out block is a teaching device. Students see the raw approach directly above the POM version, making the comparison tangible in the same file.
- `Line 13`: `new LoginPage(page)` — constructs the page object, injecting Playwright's `page` instance. The constructor wires up all locators (`emailInput`, `passwordInput`, `loginButton`) without touching the DOM.
- `Line 14`: `loginPage.goto()` — navigates to the app URL. The URL is defined once in `LoginPage.ts`, not duplicated per test.
- `Line 15`: `loginPage.login("standard_user", "tta_secret")` — delegates all fill/click mechanics to the page object. The test only passes credentials.
- `Line 16`: `toHaveTitle("TTACart - Login")` — the title assertion is the only Playwright API used directly in the test, because it is a page-level check with no reusable abstraction needed.

**Why this approach was chosen:**

The coder intentionally kept this spec minimal (one test, one page object) to isolate the POM concept. Showing the commented-out raw version side-by-side makes the value immediately obvious: the test shrank from ~10 lines of selector noise to 3 lines of intent. `LoginPage` now owns the URL, the locators, and the action sequence — change any one of them in the app and only `LoginPage.ts` needs updating.

**Alternative Effective Way:**

Use Playwright **fixtures** to provide the page object automatically, removing even the `new LoginPage(page)` boilerplate from every test:

```typescript
// fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

export const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

// spec (with fixture)
test('Login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'tta_secret');
});
```

This is more scalable for large suites — fixtures compose, support `beforeAll` caching, and are type-safe by design.

---

## Common Mistakes

- **Calling `page.goto()` in the test** instead of `loginPage.goto()` — the URL now lives in two places and drifts.
- **Asserting on internal locators from the spec** (e.g., `expect(loginPage.emailInput).toBeVisible()`) — specs should assert on outcomes (URL, title, text), not on implementation details of the page object.
- **Skipping `test.describe`** for a single test — when more tests are added later, the report becomes harder to read without grouping.
- **Passing raw `page` locators into the page object** instead of constructing them inside the class — defeats encapsulation.

---

## Summary

**Key Takeaway:** POM's core value is that tests describe *what* the user does, while page objects describe *how* the app is built. This single-page demo shows that even a two-method class (`goto` + `login`) reduces the test body to three readable lines and makes the entire test immune to selector changes in the login form.
