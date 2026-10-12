# 287_Test_Hooks_TC3 — Suite Lifecycle: beforeAll, beforeEach, afterEach & afterAll

**File:** `29_Playwright/e2e_tests/18_Test_hooks/287_Test_Hooks_TC3.spec.ts`

## Overview
This specification demonstrates the complete suite lifecycle hook architecture in Playwright:
- `beforeAll`: One-time setup per worker process (e.g. database seeding, test data creation).
- `beforeEach`: Per-test setup with isolated `page` and `context` instances.
- `afterEach`: Teardown and failure handling using `testInfo` (capturing screenshots on failure).
- `afterAll`: One-time cleanup per worker process.

---

## Main Concept
Playwright enforces strict test isolation by default. Every test receives a fresh, isolated `BrowserContext` and `Page`.
Understanding the lifecycle hierarchy:
1. **`test.beforeAll`**: Runs once per worker before any tests in the file or group execute. Useful for heavy setup like seeding databases or generating auth tokens.
2. **`test.beforeEach`**: Runs before every single test with fresh fixtures.
3. **`test.afterEach`**: Runs immediately after each test finishes, receiving the current `TestInfo` object containing test status, duration, retries, and failure details.
4. **`test.afterAll`**: Runs once after all tests in the worker complete.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    // run once per worker — e.g. seed test data, spin a docker container
    console.log('beforeAll — server is up');
});

test.beforeEach(async ({ page }) => {
    // run before every test — e.g. log in, seed cookies
    await page.goto('https://app.thetestingacademy.com/playwright/');
});

test('practice index has 47 cards', async ({ page }) => {
    await expect(page.locator('.index-card')).toHaveCount(47);
});

test('sidebar collapse button works', async ({ page }) => {
    await page.getByLabel('Toggle sidebar').first().click();
    await expect(page.locator('.tta-shell')).toHaveAttribute('data-sidebar-collapsed', 'true');
});

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await page.screenshot({ path: `out/fail-${testInfo.title}.png`, fullPage: true });
    }
});

test.afterAll(async () => {
    console.log('afterAll — tear down');
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `287_Test_Hooks_TC3.spec.ts`

**Line-by-line Explanation:**
*   `Line 1`: Imports test and assertion fixtures.
*   `Line 3-6`: `test.beforeAll`: Executes once per worker process before any tests run.
*   `Line 8-11`: `test.beforeEach`: Navigates to the base URL before each individual test, ensuring every test starts from a known, clean state.
*   `Line 13-15`: First test asserting the index cards count.
*   `Line 17-20`: Second test asserting the sidebar toggle behavior.
*   `Line 22-26`: `test.afterEach`: Receives `{ page }` and `testInfo`. Checks `if (testInfo.status !== testInfo.expectedStatus)` to determine if the test failed, and if so, takes a full-page screenshot saved to `out/fail-${testInfo.title}.png`.
*   `Line 28-30`: `test.afterAll`: Runs once when all tests in the file complete for teardown operations.

**Why this approach was chosen:**
The coder chose this pattern to illustrate how to capture failure artifacts programmatically using `testInfo`. Checking `testInfo.status !== testInfo.expectedStatus` accurately detects failures while correctly handling tests marked with `test.fail()` (where a failing status is the expected outcome).

**Alternative Effective Ways:**
While custom screenshot logic inside `afterEach` works, Playwright provides built-in configuration options for automatic failure screenshots in `playwright.config.ts`:
```typescript
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  }
});
```
Using the config-level options automatically attaches screenshots directly to the test in HTML and Allure reports without writing custom filesystem write calls in test files.

---

### Key Points
- `beforeAll`/`afterAll` run once per worker process, not per test.
- `beforeEach`/`afterEach` run for every individual test.
- `testInfo` provides rich metadata including `testInfo.title`, `testInfo.status`, and `testInfo.attachments`.

---

## Common Mistakes
- Trying to access `{ page }` in `beforeAll` without understanding that `page` is a per-test fixture; `page` does not exist in `beforeAll` unless instantiated manually via a custom context.
- Assuming `beforeAll` runs only once globally across multiple parallel workers; `beforeAll` runs **once per worker process**.
- Throwing unhandled errors in `afterEach`, which masks the original test failure in reports.

---

## Summary
**Key Takeaway:** Lifecycle hooks (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`) manage setup and teardown effectively, while `testInfo` enables conditional failure inspection and reporting.
