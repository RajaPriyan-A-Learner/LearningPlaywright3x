# 299_No_POM — Inline Locators Without Page Object Model

**File:** `29_Playwright/e2e_tests/20_Page_Object_Model/299_No_POM.spec.ts`

## Overview

This spec intentionally skips the Page Object Model to demonstrate what test code looks like when all locators and interactions live directly inside the test body. It is a deliberate **before** snapshot — the raw, maintenance-heavy style that POM is designed to replace. The test logs in to a practice app using `data-driven` credentials and asserts the post-login URL matches a regex.

---

## Main Concept

When there is no POM, every test must declare its own locators — `getByRole`, `locator`, `getByTestId` — inline. If the same login form appears in five tests, each test duplicates those three selector calls. A single attribute rename in the app breaks all five.

The test also showcases Playwright's **chained `.or()`** locator strategy: a resilient compound locator that tries each selector in order, useful during migrations where element attributes are unstable across environments.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('DDT Simple', () => {
    const data = {
        description: "valid credentials",
        username: "admin@gmail.com",
        password: "admin123",
        expectedURL: /admin/,
        shouldPass: true
    };

    test(`Login with : ${data.description}`, async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

        // Inline locators — no POM abstraction
        let textboxEmailAddress = page.getByRole("textbox", { name: "Email Address" });
        let textboxPassword = page.getByRole("textbox", { name: "Password" })
            .or(page.locator("#password"))
            .or(page.locator('[name="password"]'));
        let buttonLogin = page.getByRole("button", { name: "Login to Practice Account" })
            .or(page.getByTestId("login-button"))
            .or(page.getByText("Login to Practice Account"));

        await textboxEmailAddress.fill(data.username);
        await textboxPassword.fill(data.password);
        await buttonLogin.click();

        await expect(page).toHaveURL(data.expectedURL);
    });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

**Line-by-line Explanation:**

- `Line 1`: Imports `test` and `expect` — the only Playwright essentials; no page class needed since nothing is abstracted.
- `Lines 3–11`: A `data` object is declared at describe-block scope. Minimal DDT pattern — test metadata is centralised in a plain object rather than an external file, keeping the file self-contained.
- `Line 14`: The test name interpolates `data.description`, so the Playwright HTML report shows a meaningful label like *"Login with : valid credentials"* instead of a generic test ID.
- `Line 15`: `page.goto()` navigates directly inside the test — the URL is hardcoded here and repeated in every test that needs the same page.
- `Line 18`: `getByRole("textbox", { name: "Email Address" })` uses the ARIA accessible name. Robust as long as the label text stays unchanged.
- `Lines 19–20`: `.or()` creates a **compound locator**. Playwright resolves the first selector that exists in the DOM. Three fallback strategies (role → ID → `name` attribute) cover attribute differences across environments.
- `Lines 21–23`: Same `.or()` chain for the login button — `getByRole` → `getByTestId` → `getByText`.
- `Lines 25–27`: `fill` + `click` called directly on inline locators — no method delegation.
- `Line 29`: `toHaveURL(/admin/)` uses a **regex** so the assertion passes regardless of trailing slashes or query params.

**Why this approach was chosen:**

This is a teaching file, not a production spec. Its purpose is to make students feel the friction: duplicating these three selector chains in twenty tests means every app change breaks every test. This pain is the lesson that motivates POM.

**Alternative Effective Way:**

Extract all locators and actions into a `LoginPage` class:

```typescript
// pages/LoginPage.ts
export class LoginPage {
    constructor(private page: Page) {
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    }
    async login(u: string, p: string) { /* ... */ }
}
// spec: const loginPage = new LoginPage(page); await loginPage.login(...);
```

One selector change in `LoginPage.ts` fixes every test automatically.

---

## Common Mistakes

- **Duplicating inline locators** across many test files — changing a selector becomes a multi-file hunt.
- **Hardcoding URLs** inside each test instead of `baseURL` in `playwright.config.ts` — breaks tests during environment switches.
- **Overusing `.or()` permanently** rather than fixing the underlying attribute inconsistency — masks instability.
- **Using `getByText` as the first option** in an `.or()` chain — text changes with translations; it should be the last fallback.

---

## Summary

**Key Takeaway:** This file is a deliberate anti-pattern demo. Writing locators inline in every test works for one test but becomes a maintenance nightmare at scale. The friction here is the lesson — POM centralises selectors and actions into typed, reusable classes, turning multi-file breakage into single-file fixes.
