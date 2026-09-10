# 233 — Accessibility Locators, Test IDs, and Auto-Waiting in Practice

**File:** `29_Playwright/02_Playwright_Architecture/tta_check.spec.ts`

## Overview
This specification demonstrates modern Playwright locator best practices on a live web form (`The Testing Academy practice app`). It combines accessible role-based locators (`getByRole('textbox', { name: ... })`) for form inputs with explicit automation test ID locators (`getByTestId('login-button')`), highlighting how Playwright's built-in actionability engine eliminates the need for manual timeouts (`waitForTimeout`).

---

## Main Concept

Writing stable end-to-end tests requires selecting locators that mirror user interactions and survive frontend UI redesigns.

### 1. The Locator Ladder in Action
- **`getByRole('textbox', { name: 'Email Address' })` (Tier 1):** Targets the input by its ARIA role (`textbox`) and accessible label (`Email Address`). If an engineer changes an `<input>` from CSS class `.form-ctrl` to `.modern-input`, or restructures the DOM, this locator continues to pass seamlessly because the accessible role remains unchanged.
- **`getByTestId('login-button')` (Tier 3):** Targets the dedicated automation attribute `data-testid="login-button"`. Reserved as a developer-tester contract, test IDs never change during cosmetic style redesigns.

### 2. Built-in Auto-Waiting vs `waitForTimeout`
Notice line 10 of the spec: `// await page.waitForTimeout(50000);`.
Manual timeouts are an anti-pattern:
- **Auto-Wait Gauntlet:** When `page.getByTestId('login-button').click()` is called, Playwright automatically waits for the button to be **attached**, **visible**, **stable** (no CSS animations in flight), **enabled** (not disabled during form validation), and **unobscured** by overlays or spinners.
- **Zero Fixed Sleeps:** Tests run at maximum machine speed when elements are ready and only wait the necessary milliseconds required by the application.

### Working Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('The Testing Academy — Element Filter & Login Flow', () => {
  test('authenticates successfully using role-based and test-id locators', async ({ page }) => {
    // 1. Navigate to target form
    await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

    // 2. Fill Email using accessible role locator
    const emailField = page.getByRole('textbox', { name: 'Email Address' });
    await emailField.fill('pramod@testingacademy.com');

    // 3. Fill Password using accessible role locator
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.fill('Testing123!');

    // 4. Click Submit using dedicated automation testId
    const loginButton = page.getByTestId('login-button');
    await loginButton.click();

    // 5. Web-first retrying assertion (replaces any manual wait)
    await expect(page).toHaveURL(/.*dashboard|.*filter/);
  });
});
```

---

## Common Mistakes

1. **Calling `.click()` Right Before `.fill()`:** Calling `await emailField.click()` followed immediately by `await emailField.fill(...)` is redundant. `fill()` automatically scrolls the node into view, focuses the input, clears existing content, and sends input events in one atomic operation.
2. **Leaving Commented `waitForTimeout` in Production Repositories:** Lingering `waitForTimeout` comments suggest hesitation about test flakiness. Replace any need for waiting with explicit web-first assertions like `await expect(locator).toBeVisible()`.
3. **Using Case-Sensitive Text Without Exact Matching Awareness:** `getByRole` name matching is case-insensitive substring matching by default. Pass `{ exact: true }` when multiple buttons share overlapping names (e.g. "Save" vs "Save and Exit").

---

## Summary
- Combining `getByRole` for form fields with `getByTestId` for interactive action buttons represents the gold standard of resilient Playwright authoring.
- Playwright's actionability engine handles element readiness automatically, making arbitrary sleep timers obsolete.
