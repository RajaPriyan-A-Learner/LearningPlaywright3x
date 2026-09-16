# 239 — CSS Selector Strategies, Navigation Lifecycle & Form Authentication

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/239_Fresh.spec.ts`

## Overview
This file explores standard CSS selector strategies (`#id`, `.className`, `[name="value"]`, tag, and custom data attributes) alongside fine-grained navigation controls in `page.goto()` (`waitUntil: 'domcontentloaded'`, custom timeouts, and per-navigation `referer`). It demonstrates an end-to-end negative authentication test against a real web application (VWO Login), verifies error message banner rendering using web-first retrying assertions (`toContainText`), and touches upon interactive debugging workflows with `page.pause()`.

---

## Main Concept

While Playwright advocates accessibility-first locators (`page.getByRole()`, `page.getByLabel()`), understanding native CSS selectors is critical for legacy systems, highly dynamic SPAs, custom data grids, and components without accessible ARIA trees.

### 1. CSS Selector Taxonomy

The browser's native CSS engine powers CSS selector evaluation in Playwright:

| Selector Type | Syntax | HTML Example | Playwright Locator |
| :--- | :--- | :--- | :--- |
| **ID** | `#id` | `<input id="login-username">` | `page.locator("#login-username")` |
| **Class** | `.className` | `<input class="text-input">` | `page.locator(".text-input")` |
| **Name Attribute** | `[name="value"]` | `<input name="username">` | `page.locator('[name="username"]')` |
| **Tag** | `tag` | `<button>` | `page.locator("button")` |
| **Custom / QA Attribute**| `[data-qa="value"]` | `<input data-qa="hocewoqisi">` | `page.locator('[data-qa="hocewoqisi"]')` |
| **Compound / Chained** | `tag#id[name="val"]` | `<input id="user" name="user">`| `page.locator('input#user[name="user"]')` |

### 2. Fine-Grained `page.goto()` Navigation Lifecycle

By default, `page.goto()` waits until the `'load'` event fires. For heavy single-page apps (SPAs) loaded with analytics trackers, font downloads, and third-party scripts, waiting for `'load'` can cause unnecessary test delays or timeout failures.

Playwright provides fine-grained lifecycle triggers via the `waitUntil` option:

```
Navigation Initiated
       │
       ├──► 'commit'            ──► Headers received, document response started.
       │
       ├──► 'domcontentloaded'  ──► HTML parsed, DOM ready (Images/stylesheets may still load).
       │
       ├──► 'load' (default)    ──► All assets, stylesheets, scripts finished loading.
       │
       └──► 'networkidle'       ──► No active network connections for at least 500ms.
```

- **`waitUntil: 'domcontentloaded'`**: Speeds up test execution on SPAs because interactions can start as soon as DOM nodes are available.
- **`timeout: 3000`**: Overrides the default 30-second navigation timeout for fast-fail scenarios.
- **`referer: "https://sdet.live"`**: Injects an HTTP Referer header specifically for this navigation request.

### 3. Retrying Assertion on Dynamic Error Banners

After submitting credentials, web applications render asynchronous toast notifications or error banners. Using Playwright's web-first retrying assertions guarantees resilient checks:

```typescript
const error_message = page.locator('#js-notification-box-msg');
await expect(error_message).toContainText("Your email, password, IP address or location did not match");
```
Playwright repeatedly queries `#js-notification-box-msg` until the text matches or the 5-second assertion timeout expires, completely eliminating `sleep()` statements.

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test('Verify VWO negative login flow and error notification banner', async ({ page }) => {
    // 1. Fast navigation with domcontentloaded and custom referer
    await page.goto("https://app.vwo.com", {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
        referer: "https://sdet.live"
    });

    // 2. Locate elements using CSS ID selectors (lazy references)
    const userNameField = page.locator("#login-username");
    const passwordField = page.locator("#login-password");
    const loginButton    = page.locator("#js-login-btn");

    // 3. Dispatch form actions (auto-waits for visibility & enable state)
    await userNameField.fill("admin@admin.com");
    await passwordField.fill("pass123");
    await loginButton.click();

    // 4. Assert error banner with web-first retrying matcher
    const errorMessage = page.locator('#js-notification-box-msg');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Your email, password, IP address or location did not match");
});
```

---

## Common Mistakes

- **Leaving `await page.pause()` in Test Suites:** Calling `page.pause()` invokes the Playwright Inspector GUI. While excellent for local exploratory debugging, in headless CI environments it halts test execution indefinitely until the CI job times out.
- **Setting Unrealistically Low Timeouts:** Configuring `timeout: 3000` (3 seconds) on live external domains like `app.vwo.com` causes intermittent test failures due to normal internet latency fluctuations. Production tests should use 10,000ms–30,000ms.
- **Overusing `waitUntil: 'networkidle'`:** SPAs with ongoing WebSocket pings, streaming analytics, or long-polling will never achieve network idle, causing `page.goto()` to throw a timeout. Prefer `'domcontentloaded'` or `'load'`.
- **Using Class Names with Unescaped Characters:** CSS classes generated by frameworks (e.g., Tailwind's `class="W(100%)"`) contain special characters like `(` and `)`. Writing `page.locator(".W(100%)")` throws a CSS parsing error unless escaped (`page.locator(".W\\(100\\%\\)")`). Prefer IDs or test IDs.

---

## Summary
**Key Takeaway:** Native CSS selectors (`#id`, `[name="..."]`) offer direct DOM targeting for forms and legacy applications, while `page.goto()` lifecycle options (`waitUntil: 'domcontentloaded'`) accelerate SPA navigation. Combining these with web-first assertions (`expect(locator).toContainText()`) provides reliable, deterministic test automation without hardcoded sleeps.
