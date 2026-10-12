# 282_Expect_TC2 — Web-First DOM Assertions: Visibility, Attributes & Counts

**File:** `29_Playwright/e2e_tests/17_Expect_Assertions/282_Expect_TC2.spec.ts`

## Overview
This specification demonstrates Playwright's core asynchronous **web-first assertions**. It navigates to an element filtering testbed and verifies:
1. Element visibility (`toBeVisible`)
2. Substring containment with custom timeout options (`toContainText`)
3. HTML attribute values (`toHaveAttribute`)
4. Matched locator collection counts (`toHaveCount`)

---

## Main Concept
Unlike traditional synchronous assertions, **Playwright's web-first assertions poll the DOM continuously** until either:
- The expected condition becomes true, OR
- The assertion timeout (default: 5,000ms) expires.

This auto-retrying mechanism makes tests resilient to network latency, client-side rendering delays, and CSS transition animations without requiring arbitrary manual wait statements (`sleep` or `waitForTimeout`).

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter.html');
   });

   test('Expect', async ({ page }) => {
      const heading = page.getByText('multiple element filters', { exact: true });
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('filter', { timeout: 10000 });

      const email = page.getByRole('textbox', { name: 'Email Address' });
      await expect(email).toHaveAttribute('id', 'email');
      await expect(email).toHaveAttribute('type', 'email');
      await expect(email).toHaveAttribute('placeholder', 'student@thetestingacademy.com');

      const footerLinks = page.locator('footer a');
      await expect(footerLinks).toHaveCount(16);
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `282_Expect_TC2.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-8`: Sets up the test suite and opens the multi-element filtering page.
*   `Line 12`: Finds a heading element by exact text match using `getByText(..., { exact: true })`.
*   `Line 13-14`: Asserts visibility using `toBeVisible()`, and asserts that the text contains 'filter' using `toContainText` with an extended timeout override of `10000` ms.
*   `Line 16`: Finds an accessible text input using `getByRole('textbox', { name: 'Email Address' })`.
*   `Line 17-19`: Validates that the input element has the expected HTML attributes (`id`, `type`, `placeholder`) using `toHaveAttribute`.
*   `Line 22-23`: Counts all anchor links nested inside the `<footer>` container and asserts that exactly 16 links are rendered using `toHaveCount(16)`.

**Why this approach was chosen:**
The coder chose web-first assertions because they eliminate race conditions. If the page loads asynchronously via JavaScript, `expect(email).toHaveAttribute(...)` will auto-retry until the attribute is populated, avoiding flaky tests caused by reading properties before the DOM has finished rendering.

**Alternative Effective Ways:**
For input fields, Playwright provides specialized, higher-level matcher methods that are more semantic than checking raw attributes:
```typescript
// Instead of checking the placeholder attribute:
await expect(email).toHavePlaceholder('student@thetestingacademy.com');

// Instead of checking input value via attributes:
await expect(email).toHaveValue('');
await expect(email).toBeEmpty();
```
These purpose-built matchers produce clearer error messages when assertions fail.

---

### Key Points
- All locator assertions (`toBeVisible`, `toHaveText`, `toHaveAttribute`, `toHaveCount`) return Promises and **MUST be awaited**.
- Web-first assertions poll the DOM automatically up to the configured timeout.
- You can override timeouts for individual assertions via `{ timeout: 10000 }`.

---

## Common Mistakes
- Omitting `await` before web-first assertions (e.g. `expect(heading).toBeVisible()`), causing the assertion promise to be ignored or fail silently.
- Extracting values first with `await locator.getAttribute('id')` and comparing with `toBe('email')`; this converts a resilient auto-retrying check into a brittle, non-retrying snapshot.
- Hardcoding `toHaveCount` before dynamic lists finish rendering their items.

---

## Summary
**Key Takeaway:** Asynchronous web-first assertions (`await expect(locator)...`) provide auto-retrying validation of DOM state, eliminating flakiness from modern asynchronous web applications.
