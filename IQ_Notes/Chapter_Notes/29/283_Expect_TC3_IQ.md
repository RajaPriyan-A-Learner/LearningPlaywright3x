# 283_Expect_TC3 — Soft Assertions & Assertion Negation

**File:** `29_Playwright/e2e_tests/17_Expect_Assertions/283_Expect_TC3.spec.ts`

## Overview
This specification demonstrates two essential testing patterns:
1. **Soft Assertions (`expect.soft`)**: Collecting multiple validation failures across a form without immediately aborting the test.
2. **Assertion Negation (`.not`)**: Inverting matchers to verify that errors are absent (`not.toBeVisible()`) and strings do not contain undesirable substrings (`not.toContain('error')`).

---

## Main Concept
By default, Playwright uses **hard assertions**: the moment an assertion fails, an exception is thrown, halting the test execution immediately.
However, during end-to-end form verification, QA engineers often want to validate multiple independent fields (e.g., verifying 10 different labels or attributes) in a single run.
Using **`expect.soft`**:
- Records the failure in the test report.
- Continues executing subsequent test steps.
- Marks the test as failed at the end of execution.

Placing a hard assertion after a block of soft assertions acts as a **quality gate**, ensuring critical prerequisites are met before proceeding to subsequent test stages.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test('3 soft assertions & Negation', async ({ page }) => {
   await page.goto('https://app.thetestingacademy.com/playwright/tables/practice.html');
   let firstName = await page.getByTestId('first-name');

   // Soft: Each line records its own failure; test continues either way.
   await expect.soft(firstName).toHaveAttribute('id', 'first-name');
   await expect.soft(firstName).toBeVisible();
   await expect.soft(firstName).toHaveValue('');

   // Hard: Final hard assertion still runs after the soft block.
   await expect(firstName).toBeEnabled();
   // (If this hard assertion fails, execution stops here)

   await page.goto('https://app.thetestingacademy.com/playwright/webtable.html');
   await expect(page.locator('#error')).not.toBeVisible();

   let title = await page.title();
   expect(title).not.toContain('error');
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `283_Expect_TC3.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-3`: Imports test fixtures and defines the test case.
*   `Line 5-6`: Navigates to the practice tables page and locates the `first-name` input via `getByTestId`.
*   `Line 9-11`: Executes three consecutive soft assertions: verifying the `id` attribute, element visibility, and empty initial value. If any of these assertions fail, Playwright logs the details and continues immediately to the next line.
*   `Line 16`: Executes a hard assertion `await expect(firstName).toBeEnabled()`. If this fails, test execution halts here.
*   `Line 18-19`: Navigates to another page and uses `.not.toBeVisible()` to confirm that no error alert container `#error` is visible.
*   `Line 21-22`: Retrieves the document title and uses negated synchronous assertion `expect(title).not.toContain('error')` to verify the page loaded cleanly.

**Why this approach was chosen:**
The coder chose `expect.soft` to demonstrate how to avoid "fail-fast" behavior when testing multi-attribute forms. Running multiple soft assertions in sequence gives developers a complete report of all broken form attributes in a single test run, rather than fixing them one by one across multiple iterations.

**Alternative Effective Ways:**
While soft assertions are useful for static form inspections, they should be used judiciously. Avoid using soft assertions on critical navigation or authorization steps—if login fails, subsequent soft-asserted steps will likely fail as well, producing noisy test logs.
For checking page titles, an alternative web-first approach is:
```typescript
await expect(page).toHaveTitle(/^(?!.*error).*$/i);
// Or simply:
await expect(page).not.toHaveTitle(/error/i);
```
Using `expect(page).not.toHaveTitle(...)` retries automatically until title redirects settle, which is cleaner than manual `page.title()` snapshots.

---

### Key Points
- `expect.soft(...)` logs failures without terminating the test early.
- If any soft assertion fails, the test is marked as failed after all steps finish.
- `.not` inverts any matcher (e.g. `not.toBeVisible()`, `not.toHaveClass()`, `not.toBeChecked()`).
- Place hard assertions strategically after soft blocks to prevent downstream steps from executing when core prerequisites fail.

---

## Common Mistakes
- Using `expect.soft` on critical preconditions (like login or payment confirmation), which causes confusing cascade failures downstream.
- Overusing `.not.toBeVisible()` on elements that may never be present in the DOM; `not.toBeVisible()` passes if the element is either hidden OR completely absent from the DOM, which can mask locator bugs.
- Omitting `await` on `await expect.soft(...)`, which causes the promise to float unhandled.

---

## Summary
**Key Takeaway:** `expect.soft` allows comprehensive reporting across multi-field forms without aborting early, while `.not` enables straightforward negative validation of UI states.
