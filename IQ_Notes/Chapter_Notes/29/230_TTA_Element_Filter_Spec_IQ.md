# 230 — Accessibility Locators, Test IDs, and Auto-Waiting in Practice

**File:** `29_Playwright/e2e_tests/01_Basics/230_tta_check.spec.ts`

## Overview
This file explores practical element location strategies on an authentication form, contrasting user-facing accessibility locators (`page.getByRole('textbox')`) with developer-targeted test IDs (`page.getByTestId('login-button')`). It illustrates how Playwright automatically waits for elements to become visible, enabled, and stable before dispatching click and fill events.

---

## Main Concept

A core pillar of Playwright's test stability is **Resilient Element Identification**. Modern web applications rely on complex CSS classes (often randomized by CSS-in-JS libraries like styled-components or Tailwind). Locating elements by accessibility roles or explicit `data-testid` attributes isolates tests from stylistic refactoring.

### The Recommended Locator Hierarchy

```
1. getByRole()        ───► Most resilient: mimics screen reader & real user interaction
2. getByLabel()       ───► Ideal for form inputs linked to <label> elements
3. getByPlaceholder() ───► Useful when inputs lack permanent labels
4. getByText()        ───► Great for non-interactive textual content
5. getByTestId()      ───► Developer contract: stable attribute for testing
6. locator(css/xpath) ───► Last resort when semantic attributes are unavailable
```

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test('login form submission using role and testId locators', async ({ page }) => {
  // Navigate to target application
  await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');

  // Locate input using accessible role 'textbox' with accessible label
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('pramod');

  // Locate password field
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123');

  // Locate submit button using data-testid
  await page.getByTestId('login-button').click();
});
```

### Key Points
- **Auto-Wait on `fill()` and `click()`:** Playwright checks whether the target element is visible, actionable, and not covered by an overlay before executing actions.
- **`data-testid` Convention:** By default, `page.getByTestId('login-button')` matches `data-testid="login-button"`. The attribute name can also be customized in `playwright.config.ts`.
- **Elimination of Artificial Pauses:** Notice the commented-out `// await page.waitForTimeout(50000);`. Relying on explicit `waitForTimeout` is an anti-pattern in modern test automation because Playwright handles waiting natively.

---

## Common Mistakes
- **Relying on `page.waitForTimeout()`:** Using hardcoded sleep intervals creates fragile, slow tests. Always rely on auto-waiting locators or web-first assertions like `await expect(locator).toBeVisible()`.
- **Not Scoping Ambiguous Locators:** If multiple textboxes share the same role without unique names, `getByRole('textbox')` will throw a strict mode violation error. Always provide `{ name: '...' }` to ensure specificity.
- **Using Brittle XPath Selectors:** XPath selectors such as `//input[@id='email_input_v2']` frequently break during framework updates.

---

## Summary
**Key Takeaway:** Combining accessibility-first locators (`getByRole`) for form inputs with dedicated test IDs (`getByTestId`) for critical triggers produces clean, resilient tests that survive frontend styling refactors.
