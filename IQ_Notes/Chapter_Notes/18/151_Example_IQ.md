# 151_Example — Async/Await in a Real Playwright Test

**File:** `18_chapter_Async_Await/151_Example.spec.ts`

## Overview
This file shows exactly how `async/await` is applied inside a real Playwright test. Every Playwright browser interaction is asynchronous — `await` is the mechanism that makes the test wait for each step to complete before moving on.

## Main Concept
Playwright tests use the `async ({ page }) => {}` arrow function pattern. Every browser action (`goto`, `click`, `fill`, `expect`) returns a Promise. You must `await` each one to ensure the test runs in the correct, sequential order. Forgetting `await` causes actions to fire and be immediately abandoned, leading to flaky or completely broken tests.

### Code Example

```javascript
import { test, expect } from '@playwright/test';

test('uses await in a Playwright test', async ({ page }) => {
    // await pauses execution until the page fully loads
    await page.goto('https://playwright.dev/');

    // await pauses execution until the assertion passes (with auto-retry)
    await expect(page).toHaveTitle(/Playwright/);

    // await pauses execution until the async helper function resolves
    let value = await getExampleValue();
    expect(value).toBe('abc');
});

// An async helper function used within the test
async function getExampleValue() {
    return 'abc'; // Implicitly wrapped in Promise.resolve('abc')
}
```

### Key Points
- The `async ({ page }) => {}` callback is the standard Playwright test signature.
- `await expect(page).toHaveTitle()` is itself asynchronous — it polls the page title with automatic retries until it matches or times out.
- You can define helper `async` functions outside the test block and `await` them inside.
- Even if `getExampleValue()` returns immediately, it still returns a Promise because it is `async`. You must still `await` it.

---

## Common Mistakes
- **Missing `await` on a Playwright action:** `page.goto('https://...')` without `await` starts the navigation but doesn't wait for it. The next line runs immediately on an empty/loading page, causing errors.
- **Missing `await` on `expect`:** `expect(page).toHaveTitle(...)` without `await` queues the assertion but doesn't wait for it. The test can pass before the assertion even runs, hiding real failures.

---

## Summary
**Key Takeaway:** In Playwright, `await` is not optional — it is a required part of every browser interaction. The `async` keyword on the test callback enables this, and every action that returns a Promise must be preceded by `await` to ensure correct, sequential test execution.
