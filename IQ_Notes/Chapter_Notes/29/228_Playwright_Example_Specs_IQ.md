# 228 — Playwright Basics, Web-First Assertions & Role-Based Locators

**File:** `29_Playwright/01_Playwright_Fundamentals/e2e_tests/example.spec.ts`

## Overview
This file demonstrates the fundamental building blocks of Playwright end-to-end testing: declaring test blocks with the `test` runner function, interacting with the async `page` fixture, navigating web pages via `page.goto()`, performing auto-waiting web-first assertions with `expect(page).toHaveTitle()`, and locating semantic accessibility elements using `page.getByRole()`.

---

## Main Concept

Playwright shifts away from brittle XPath and CSS locators by recommending **User-Facing Role Locators** (`getByRole`, `getByText`, `getByLabel`) and **Web-First Assertions** (`expect(locator).toBeVisible()`).

### 1. Auto-Waiting Architecture
Unlike legacy automation tools where engineers must write manual `sleep()` or explicit polling loops, Playwright automatically performs actionability checks (visible, stable, enabled, receiving events) before every action.

### 2. Web-First Retrying Assertions vs Non-Retrying Assertions
- **Web-First (Retrying):** `await expect(page).toHaveTitle(/Playwright/)` repeatedly polls the DOM until the condition is met or the test timeout expires.
- **Non-Retrying (Brittle):** `expect(await page.title()).toBe('Playwright')` evaluates only once at the exact millisecond of execution, causing flaky failures if title rendering is asynchronous.

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation Portal', () => {
  
  test('has title and validates branding', async ({ page }) => {
    // Navigate to target site with network idle / load awareness
    await page.goto('https://playwright.dev/');

    // Retrying web-first assertion against page title
    await expect(page).toHaveTitle(/Fast and reliable end-to-end testing/);
  });

  test('get started link navigates to installation guide', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Locate element using accessible role 'link' with accessible name
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await getStartedLink.click();

    // Verify presence of top-level heading
    const installationHeading = page.getByRole('heading', { name: 'Installation', level: 1 });
    await expect(installationHeading).toBeVisible();
  });

});
```

### Key Points
- **Fixtures:** The `{ page }` argument is a fresh, isolated `Page` instance created inside a new `BrowserContext` for every test run.
- **Accessibility Tree Alignment:** Using `getByRole` guarantees that tests validate the exact DOM accessibility tree used by screen readers and real users.
- **Regular Expressions in Assertions:** Assertions accept RegExp patterns (e.g. `/Playwright/`), facilitating flexible partial title or text matches.

---

## Common Mistakes
- **Forgetting `await` on Assertions and Actions:** Writing `expect(locator).toBeVisible()` without `await` creates an unhandled promise that fails silently or executes out of order.
- **Using Non-Retrying Synchronous Matchers:** `expect(await page.innerText('#title')).toBe('Title')` breaks on dynamic single-page applications. Always use `await expect(page.locator('#title')).toHaveText('Title')`.
- **Over-reliance on Implementation Details:** Locating elements via deep CSS paths (e.g. `div > span:nth-child(2)`) breaks when UI markup refactors occur. Use `page.getByRole()` instead.

---

## Summary
**Key Takeaway:** Playwright tests utilize auto-waiting `Page` fixtures, accessible `getByRole` locators, and retrying web-first assertions to deliver rock-solid, non-flaky E2E test scripts.
