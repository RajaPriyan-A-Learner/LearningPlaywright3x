## Overview
Demonstrates dynamically invoking a helper function to generate session state directly inside a test block.

## Main Concept
Using an imported helper function (`loginAndSaveSession`) to generate unique authentication states dynamically within a standard test block.

```typescript
import { test, expect } from '@playwright/test';
import { loginAndSaveSession } from './06_Reusable_helper_function';

test.describe('Dynamic / Conditional Auth Suite', () => {

  // Option 1: Call directly inside a setup test
  test('Login and generate session state', async ({ page, context }) => {
    await loginAndSaveSession(page, context, {
      storagePath: './playwright/.auth/custom-user.json'
    });
  });

  // Option 2: Call inside any test step dynamically
  test('Test requiring fresh state capture', async ({ page, context }) => {
    await loginAndSaveSession(page, context, {
      username: 'custom_admin@vwo.com',
      storagePath: './playwright/.auth/admin-user.json'
    });
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

## Line-by-Line Code Breakdown & Coder Rationale
- `import { loginAndSaveSession } from './06_Reusable_helper_function';`:
  - **Why the Coder Chose This:** Imports the imperative UI-driving logic. The path is relative (`./`) which is mandatory for resolving local files correctly in Node/TypeScript.
- `test('Login and generate session state', async ({ page, context }) => {`:
  - **Why the Coder Chose This:** This test exists purely to generate state (Option 1). It uses default fixtures.
- `await loginAndSaveSession(page, context, { storagePath: ... });`:
  - **Why the Coder Chose This:** Passes the active test's `page` and `context` objects to the helper so it can drive the browser.
  - **Effective Alternative Ways:** Generating state dynamically *inside* a test block takes away parallelization advantages. A much better alternative is the Global Setup or Project-Level Dependencies (`setup.ts`) because Playwright understands they must run first and can parallelize dependent tests afterwards.

## Common Mistakes
- **Incorrect import paths**: Missing the `./` or failing to escape backslashes on Windows will cause module resolution errors.
- **Race conditions**: If tests run in parallel, one test might try to read the JSON file before another test finishes generating it.

## Summary
While possible, invoking login logic dynamically inside random tests is generally an anti-pattern unless the specific workflow specifically demands generating a totally unique, randomized user per run.
