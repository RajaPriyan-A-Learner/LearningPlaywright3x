# 235 — Playwright Test Annotations: skip, fixme, only, and fail

**File:** `29_Playwright/e2e_tests/02_TestAnnotations/235_Test_Annotations.spec.ts`

## Overview
This file demonstrates Playwright's test execution control modifiers, known as **Test Annotations**. It covers conditional and unconditional test exclusions using `test.skip()` and `test.fixme()`, focused single-test execution using `test.only()`, logical test grouping inside `test.describe()`, and targeted CLI test filtering via the `-g` / `--grep` flag.

---

## Main Concept

In software test maintenance, features temporarily break, platforms have known bugs, or developers want to isolate a single test during local debugging. Playwright provides built-in declarative annotations directly attached to the `test` object.

### The Annotation Matrix

| Annotation | Execution Behavior | When to Use | Expected Outcome |
|---|---|---|---|
| `test(...)` | Runs normally | Standard test case | Passes |
| `test.skip(...)` | Never executes | Deprecated features or unsupported platforms | Skipped in report |
| `test.fixme(...)` | Never executes | Known bugs awaiting developer fix | Marked as "fixme" |
| `test.fail(...)` | Executes; expected to fail | Validating known defect reproduces | Passing if fails, fails if passes |
| `test.only(...)` | Only this test runs | Local debugging / test creation | Blocks CI build via `forbidOnly` |
| `test.slow(...)` | Triples default timeout | Heavy video/upload tests | Runs with 3x timeout |

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

    test('valid credentials', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/");
    });

    test('invalid password', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/");
    });

    // Marked as broken — will not execute and is reported as fixme
    test.fixme('checkout with PayPal', async ({ page }) => {
        // never executes
    });

    // Unconditionally skipped test
    test.skip('checkout with Apple Pay', async ({ page }) => {
        // never executes
    });

    // Uncommenting test.only() executes ONLY this test across the entire run:
    // test.only('quick verification test', async ({ page }) => {
    //     await page.goto("https://app.thetestingacademy.com/playwright/");
    // });
});

// Run this specific suite via CLI:
// npx playwright test -g "Login Page"
```

### Code Breakdown: `235_Test_Annotations.spec.ts`

**Line-by-line Explanation:**
*   `Line 3-22`: Groups related tests using `test.describe('Login Page')`.
*   `Line 5-10`: Defines two standard, executable test cases.
*   `Line 12-14`: Uses `test.fixme()`. This test is explicitly marked as broken and will not run, but it flags to the team that a bug exists.
*   `Line 16-18`: Uses `test.skip()`. This test is unconditionally skipped and won't execute.
*   `Line 19-21`: Contains a commented-out `test.only()`. If uncommented, it would force the test runner to ignore all other tests in the suite and execute *only* this specific block.
*   `Line 24`: A comment showing how to execute this specific `describe` block from the command line using the `-g` (grep) flag.

**Why this approach was chosen:**
The coder chose to showcase all the native annotations in a single file to contrast their behaviors. It visually demonstrates how developers can temporarily disable flaky tests (`skip`), document known bugs (`fixme`), and isolate a single test for fast local debugging (`only`).

**Alternative Effective Way:**
Instead of hardcoding unconditional skips like `test.skip(...)`, an alternative effective way is to conditionally skip tests based on the environment or browser being used. 
For example:
```typescript
test('Safari specific feature', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'Only run on Safari');
  // test logic...
});
```
This is more effective because it makes tests dynamic across different CI runners without requiring manual code changes to enable/disable them.

### Key Points
- **Difference between `skip` and `fixme`:** Both bypass execution, but `fixme` explicitly conveys developer intent: "This test is broken and needs fixing," preventing ignored tests from rotting silently.
- **Conditional Annotations:** Annotations can also be evaluated dynamically inside the test body: `test.skip(browserName === 'webkit', 'This feature is not supported on Safari');`.
- **CI Safety with `forbidOnly`:** In `playwright.config.ts`, setting `forbidOnly: !!process.env.CI` ensures that if a developer forgets to remove `test.only()` before pushing code, the CI pipeline immediately fails instead of accidentally skipping the rest of the test suite.

---

## Common Mistakes
- **Accidentally Committing `test.only()`:** Leaving `test.only()` active silently skips all other tests in the file or project during local runs.
- **Using Comments Instead of `test.skip()`:** Commenting out test code hides skipped coverage metrics in HTML reports. Using `test.skip()` documents why the test did not run.
- **Not Documenting the Reason for Skipping:** Always pass a descriptive string explaining why the test is skipped: `test.fixme(isMobile, 'Mobile checkout modal bug #1402');`.

---

## Summary
**Key Takeaway:** Test annotations (`skip`, `fixme`, `only`, `fail`, `slow`) provide fine-grained control over test lifecycle and reporting, while `forbidOnly` guarantees pipeline safety in production CI workflows.
