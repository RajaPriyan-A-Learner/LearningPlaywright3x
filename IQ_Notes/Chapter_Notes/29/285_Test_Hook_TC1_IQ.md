# 285_Test_Hook_TC1 — Annotations: test.skip, test.slow, test.fixme & test.fail

**File:** `29_Playwright/e2e_tests/18_Test_hooks/285_Test_Hook_TC1.spec.ts`

## Overview
This specification demonstrates Playwright's built-in test annotation modifiers:
- `test.skip()`: Programmatic conditional test skipping.
- `test.slow()`: Tripling test timeouts for known slow environments.
- `test.fixme()`: Marking tests as broken to skip execution pending defect resolution.
- `test.fail()`: Declaring that a test is expected to fail.

---

## Main Concept
Cross-browser test suites often encounter browser-specific quirks, performance differences, or known bugs during active development.
Rather than commenting out tests or using manual `if` branches that complicate test reports, Playwright provides **declarative test annotations**:
- `test.skip(condition, reason)`: When condition is met, the test is marked as skipped with the given reason logged in reports.
- `test.slow(condition, reason)`: Triples the configured test timeout (e.g. 30s becomes 90s) to accommodate heavier rendering cycles on specific engines (like WebKit or Firefox).
- `test.fixme()`: Informs the runner that the test is tracked by an open bug ticket and skips execution until fixed.
- `test.fail()`: Asserts that the test *fails*. If the test unexpectedly passes, Playwright fails the build to alert developers that the issue was resolved.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

const URL = 'https://app.thetestingacademy.com/playwright/multiple_element_filter.html';

test('title test', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Feature not yet supported on Firefox');
    await page.goto(URL);
    await expect(page).toHaveTitle(/Multiple Element Filter/, { timeout: 15000 });
});

test('email is visible (slow on firefox)', async ({ page, browserName }) => {
    test.slow(browserName === 'firefox', 'firefox is slow on this layout');
    await page.goto(URL);
    await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
});

test.fixme('password is visible — broken in Safari, fix me', async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});

test('expected to fail until backend ships', async ({ page }) => {
    test.fail();
    await page.goto(URL);
    await expect(page.getByText('New customer area', { exact: true })).toBeVisible();
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `285_Test_Hook_TC1.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-3`: Imports fixtures and declares the shared practice URL.
*   `Line 5-9`: Uses the `{ browserName }` test fixture and calls `test.skip(browserName === 'firefox', '...')`. If the active project is Firefox, the test aborts immediately and appears as skipped in the HTML report.
*   `Line 11-15`: Uses `test.slow(browserName === 'firefox', '...')` to triple the test timeout from 30s to 90s specifically when running under the Firefox engine.
*   `Line 18-21`: Marks the test using `test.fixme(...)`. Playwright skips this test during test discovery, logging the reason in the test summary without throwing errors.
*   `Line 23-27`: Calls `test.fail()` at the beginning of the test body. Playwright expects the subsequent assertion to fail. If it fails, the test is marked green; if the assertion passes, Playwright throws an error alerting the engineer to remove the `test.fail()` annotation.

**Why this approach was chosen:**
The coder chose Playwright's native annotation APIs because they provide clean reporting in CI dashboards. Using comments or simple `if` blocks can hide test coverage gaps, whereas annotations report exact counts of skipped, slow, and fixme tests.

**Alternative Effective Ways:**
You can also apply annotations conditionally at the suite configuration level inside `playwright.config.ts`, or tag tests with custom metadata:
```typescript
test('title test', {
  tag: ['@firefox-unsupported', '@smoke'],
  annotation: { type: 'issue', description: 'https://github.com/org/repo/issues/102' }
}, async ({ page }) => { ... });
```
This metadata appears directly in HTML and Allure reports, linking tests to external issue tracking systems.

---

### Key Points
- `test.skip(condition, reason)` conditionally skips execution with descriptive audit logging.
- `test.slow()` multiplies the base timeout by 3x.
- `test.fixme()` skips tests with outstanding bug tickets until resolved.
- `test.fail()` flips test expectation: failing is considered passing, and passing triggers a failure.

---

## Common Mistakes
- Calling `test.skip()` after slow operations have already executed; place annotations at the very top of the test body.
- Forgetting that `test.fail()` will fail the build once the underlying bug is fixed; always remove `test.fail()` when the defect is resolved.
- Commenting out tests entirely instead of using `test.fixme()`, which loses visibility into outstanding defects.

---

## Summary
**Key Takeaway:** Built-in annotations (`skip`, `slow`, `fixme`, `fail`) enable maintainable cross-browser test suites by making browser-specific constraints and bug statuses explicit in test reports.
