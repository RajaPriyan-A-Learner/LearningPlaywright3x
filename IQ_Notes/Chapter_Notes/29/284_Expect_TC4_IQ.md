# 284_Expect_TC4 — State Matchers: Checked, Enabled, Visible & Title RegExp

**File:** `29_Playwright/e2e_tests/17_Expect_Assertions/284_Expect_TC4.spec.ts`

## Overview
This specification demonstrates the primary state matchers in Playwright: verifying whether checkboxes are checked (`toBeChecked`), buttons are visible and interactable (`toBeVisible`, `toBeEnabled`), and pages match expected titles via regular expressions (`toHaveTitle(/regex/)`).

---

## Main Concept
Interactive forms have distinct functional states that directly impact user interactions:
- An element can be **visible** but **disabled** (e.g. a Submit button before required fields are filled).
- An element can be **enabled** but **hidden** (e.g. off-screen inputs).
- A checkbox can have its checked status toggled dynamically.

Playwright provides dedicated semantic matchers for each state:
- `toBeVisible()`: Element is visible in the viewport and not obscured.
- `toBeEnabled()`: Element does not have the `disabled` attribute and can receive input.
- `toBeChecked()`: Checkbox or radio input is currently selected.
- `toHaveTitle(RegExp)`: Validates page title against regex patterns with automatic retries.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test('Visible · enabled · disabled · checked', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/tables/practice.html');
    
    const automationCheckBox = page.getByRole('checkbox', { name: /UFT/ });
    await automationCheckBox.check();
    await expect(automationCheckBox).toBeChecked();

    const submitBtn = page.getByTestId('profile-submit');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();

    await expect(page).toHaveTitle(/QA Profile/);

    const appUrl = page.url();
    expect(appUrl).toContain('thetestingacademy');
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `284_Expect_TC4.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-3`: Standard test declaration.
*   `Line 4`: Navigates to the practice page.
*   `Line 5-7`: Targets a checkbox using role locator with RegExp name matcher (`name: /UFT/`), checks it via `.check()`, and validates the state using `await expect(automationCheckBox).toBeChecked()`.
*   `Line 9-11`: Targets the profile submit button via test ID, asserting both visibility (`toBeVisible`) and interaction readiness (`toBeEnabled`).
*   `Line 13`: Validates that the browser tab title contains "QA Profile" using regex matcher `toHaveTitle(/QA Profile/)`.
*   `Line 15-16`: Reads `page.url()` and verifies domain inclusion using synchronous substring assertion `expect(appUrl).toContain(...)`.

**Why this approach was chosen:**
The coder chose `toBeChecked()` and `toBeEnabled()` because they directly reflect user-facing interactions. Checking both `toBeVisible()` and `toBeEnabled()` on form action buttons ensures that a button is not only physically rendered, but also ready to receive user click actions.

**Alternative Effective Ways:**
For URL verification, prefer Playwright's web-first `toHaveURL` matcher rather than extracting `page.url()` synchronously:
```typescript
await expect(page).toHaveURL(/thetestingacademy/);
```
`expect(page).toHaveURL(...)` auto-retries until single-page app (SPA) client-side routing and URL redirects finish, whereas `page.url()` captures a static point-in-time snapshot that may fail if queried before the transition settles.

---

### Key Points
- `toBeChecked()` verifies checked state for checkboxes and radio buttons.
- `toBeEnabled()` / `toBeDisabled()` checks whether buttons and inputs can receive actions.
- `toHaveTitle(RegExp)` and `toHaveURL(RegExp)` provide retrying assertions on browser window metadata.

---

## Common Mistakes
- Relying solely on `toBeVisible()` for buttons that start in a disabled state; always pair with `toBeEnabled()` when asserting actionability.
- Reading `page.url()` synchronously right after a form submission before navigation completes; use `await expect(page).toHaveURL(...)` instead.
- Using `toBeChecked()` on elements that are not native `<input type="checkbox">` or ARIA `role="checkbox"` elements.

---

## Summary
**Key Takeaway:** Semantic matchers like `toBeChecked()`, `toBeEnabled()`, and `toHaveTitle(RegExp)` provide clear, resilient assertions for testing interactive form states.
