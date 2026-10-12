# 286_Test_Hooks_TC2 — Structured Reporting with test.step

**File:** `29_Playwright/e2e_tests/18_Test_hooks/286_Test_Hooks_TC2.spec.ts`

## Overview
This specification demonstrates how to structure complex, multi-action end-to-end tests into clear, logical milestones using `test.step()`. It breaks down a login workflow into three discrete steps: navigating to the page, verifying input field visibility, and submitting the form to verify navigation to `#login-success`.

---

## Main Concept
As test workflows grow to cover complete end-to-end user journeys (e.g., checkout flows spanning 15 actions), failures can become difficult to diagnose from flat logs.
`test.step('Step Title', async () => { ... })`:
1. **Hierarchical Reporting:** Groups related actions together in HTML reports, trace viewers, and console output.
2. **Granular Timing:** Automatically measures execution time for each individual step.
3. **Pinpoint Error Diagnostics:** When a step fails, the report highlights the exact step that encountered the error, along with relevant screenshots and DOM snapshots.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test('login form is reachable via steps', async ({ page }) => {
   await test.step('open practice page', async () => {
      await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter.html');
   });

   await test.step('fields are visible', async () => {
      await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
   });

   await test.step('submit + assert it lands on #login-success', async () => {
      await page.getByRole('button', { name: /Login/i }).click();
      await expect(page).toHaveURL(/#login-success$/);
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `286_Test_Hooks_TC2.spec.ts`

**Line-by-line Explanation:**
*   `Line 3-5`: Imports test runner modules and defines the test case.
*   `Line 6-8`: `test.step('open practice page', ...)`: Encapsulates page navigation inside a labeled step.
*   `Line 10-13`: `test.step('fields are visible', ...)`: Encapsulates assertion of the email and password inputs.
*   `Line 15-18`: `test.step('submit + assert it lands on #login-success', ...)`: Encapsulates form submission and URL verification.

**Why this approach was chosen:**
The coder chose `test.step()` to structure test execution into distinct phases. In Playwright's Trace Viewer and HTML reports, these steps appear as collapsible sections, allowing engineers and non-technical stakeholders to quickly see which phase of the user journey failed.

**Alternative Effective Ways:**
`test.step` blocks also support return values and nested steps:
```typescript
const orderId = await test.step('Create order in checkout', async () => {
  await test.step('Fill billing details', async () => { ... });
  await test.step('Authorize payment', async () => { ... });
  return await page.locator('#order-id').innerText();
});
```
This is particularly useful when composing complex multi-page workflows or wrapping Page Object Model methods with descriptive step logging.

---

### Key Points
- `test.step` breaks long tests into readable, timed blocks in reports and traces.
- Steps can return values to the outer test scope.
- Steps can be nested hierarchically to represent sub-tasks.

---

## Common Mistakes
- Omitting `await` before `test.step(...)`, which causes the step callback to execute unmonitored.
- Making step descriptions too generic (e.g. `test.step('step 1')`); use clear, business-focused descriptions.
- Overusing steps for single trivial lines; use them to group meaningful logical actions.

---

## Summary
**Key Takeaway:** `test.step()` groups related test actions into readable, timed sections in HTML reports and Trace Viewer, making failures easy to diagnose.
