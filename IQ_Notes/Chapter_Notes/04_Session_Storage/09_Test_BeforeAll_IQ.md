## Overview
Demonstrates using `test.beforeAll` combined with Node's file system module to conditionally generate a session state file only if it doesn't already exist.

## Main Concept
Using a suite-level lifecycle hook (`beforeAll`) to verify the existence of the `storageState` JSON and generating it on-the-fly using a standalone script if missing.

```typescript
// e2e_tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';
import { saveSession } from './08_Standalone_helper';
import fs from 'fs';

const SESSION_FILE = './user-session.json';

test.describe('Dashboard Tests', () => {
  // Generate session only if missing on disk
  test.beforeAll(async () => {
    if (!fs.existsSync(SESSION_FILE)) {
      await saveSession(SESSION_FILE);
    }
  });

  test.use({ storageState: SESSION_FILE });

  test('Navigate directly to dashboard', async ({ page }) => {
    await page.goto('https://app.wingify.com/#/dashboard');
    await expect(page.locator('.dashboard-header')).toBeVisible();
  });
});
```

## Line-by-Line Code Breakdown & Coder Rationale
- `import fs from 'fs';`: 
  - **Why the Coder Chose This:** Imports Node's native file system module to check for file existence directly.
- `test.beforeAll(async () => {`: 
  - **Why the Coder Chose This:** Executes this block once for the entire `describe` block before any tests run.
- `if (!fs.existsSync(SESSION_FILE)) { await saveSession(SESSION_FILE); }`:
  - **Why the Coder Chose This:** This is an optimization. The coder uses this to skip the slow UI login process if a valid session file already exists on disk.
  - **Effective Alternative Ways:** This pattern is fragile in highly parallelized environments (multiple workers might hit the `fs.existsSync` at the exact same time and both try to generate it). Playwright's `globalSetup` or Project Dependencies resolve this race condition natively.
- `test.use({ storageState: SESSION_FILE });`:
  - **Why the Coder Chose This:** Injects the verified (or newly generated) session file into all tests within the suite.

## Common Mistakes
- **Parallel worker conflicts**: If tests run in parallel, worker 2 might start while worker 1 is still in the middle of writing the `saveSession` file, leading to corrupt JSON reads.
- **Stale Sessions**: Checking if the file *exists* doesn't check if the token inside it has *expired*. Tests might fail cryptically if the token is 24 hours old.

## Summary
Combining `beforeAll` with `fs.existsSync` is a quick way to cache sessions locally, but it can suffer from race conditions and stale token issues in larger suites.
