# 237 — Locator Commands: Lazy Resolution, Multiple Element Filtering & Actionability

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/237_Locator_Commands.spec.ts`

## Overview
This file explores Playwright's locator architecture on complex web pages (targeting `/playwright/multiple_element_filter`). It introduces locator mechanics, emphasizing lazy resolution, actionability checks, strict mode enforcement, and how Playwright handles locating and filtering across multiple matching DOM elements without encountering stale element reference exceptions.

---

## Main Concept

In legacy testing frameworks like Selenium, finding an element immediately searches the current DOM tree. If the page mutates, re-renders, or animates before an action is dispatched, a `StaleElementReferenceException` occurs.

Playwright locators take a completely different architectural approach: **Locators are lazy, non-evaluating pointers**. Creating a locator does not make any DOM query; the query is executed dynamically right when an action (like `.click()` or `.fill()`) or assertion is performed.

```
const button = page.getByRole('button', { name: 'Submit' });
// ──► Nothing has happened in the browser yet! (Lazy pointer)

await button.click();
// ──► 1. Query DOM for matching element
// ──► 2. Wait until element is attached to DOM
// ──► 3. Wait until element is visible
// ──► 4. Wait until element is stable (no moving animations)
// ──► 5. Wait until element is enabled (not disabled)
// ──► 6. Wait until element receives events (not covered by overlay)
// ──► 7. Dispatch click event!
```

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test("Verify multiple element filtering and locator commands", async ({ page }) => {
    // Navigate to multiple element filter practice page
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    // 1. Basic Locator Creation (Lazy resolution)
    const filterContainer = page.locator('.product-filter-container');

    // 2. Chained and Filtered Locators
    // Find item cards containing specific text or child elements
    const targetProduct = page.locator('.product-card')
        .filter({ hasText: 'Playwright Framework' })
        .getByRole('button', { name: 'Enroll' });

    // 3. Resolving multiple elements:
    // When multiple elements match, choose one deterministically:
    const firstButton = page.getByRole('button').first();
    const lastButton  = page.getByRole('button').last();
    const thirdButton = page.getByRole('button').nth(2);

    // 4. Web-First Retrying Assertion on Locator State
    await expect(filterContainer).toBeVisible();
});
```

### Key Points
- **Strict Mode Enforcement:** By default, if a locator resolves to multiple elements and an action is attempted (e.g. `page.getByRole('button').click()`), Playwright throws a `strict mode violation` error. This forces tests to be unambiguous.
- **Filtering API:** Locators can be refined using `.filter({ hasText: '...' })` or `.filter({ has: page.locator('.badge') })`, keeping selectors clear and maintainable.
- **Zero Stale Elements:** Because locators re-query the live DOM at the instant of interaction, single-page app (SPA) re-renders never invalidate the locator.

---

## Common Mistakes
- **Violating Strict Mode:** Calling an action on a locator that matches multiple elements without narrowing it down via `.filter()`, `.first()`, or explicit accessible names.
- **Using `page.$(selector)` Instead of `page.locator(selector)`:** `page.$()` is an older, non-retrying API that returns an `ElementHandle`. It bypasses auto-waiting and is prone to flakiness. Always use `page.locator()`.
- **Calling `await` on Locator Creation:** Writing `const btn = await page.locator('button')` is invalid. Locators are synchronous factories; only actions and assertions are asynchronous (`await btn.click()`).

---

## Summary
**Key Takeaway:** Playwright locators are lazy, reusable, auto-waiting recipes that continuously re-evaluate against the live DOM, eliminating stale element exceptions and guaranteeing actionability before every interaction.
