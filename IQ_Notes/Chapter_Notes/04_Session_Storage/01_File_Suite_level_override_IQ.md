## Overview
Demonstrates how to override the session state for a specific test file or `describe` suite.

## Main Concept
Using `test.use({ storageState: '...' })` inside a file applies the provided session state to all tests in that scope, overriding any global defaults.

```typescript
import { test, expect } from '@playwright/test';

// Scoped to this file or describe block
test.use({ storageState: './user-session.json' });

test('Direct Dashboard Navigation', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/dashboard/);
});
```

## Line-by-Line Code Breakdown & Coder Rationale
- `import { test, expect } from '@playwright/test';`: Imports the core testing fixtures from Playwright.
- `test.use({ storageState: './user-session.json' });`: 
  - **Why the Coder Chose This:** This is the crux of the file. `test.use` overrides configuration for the entire file (or `describe` block if placed inside). The author uses this to ensure that all tests within this scope start with the cookies and local storage state from `./user-session.json`.
  - **Effective Alternative Ways:** An alternative is defining this `storageState` at the project level in `playwright.config.ts`. The config approach is cleaner for large suites, but `test.use` is excellent for isolated files that need a unique role (e.g., an Admin-only spec file) without touching global config.
- `test('Direct Dashboard Navigation', async ({ page }) => {`: Starts a test case using the default `page` fixture.
- `await page.goto('/dashboard');`: 
  - **Why the Coder Chose This:** Navigates directly to a protected route to verify that the injected storage state allows bypassing the login screen.
- `await expect(page).toHaveURL(/dashboard/);`: Verifies the authentication state held.

## Common Mistakes
- **Incorrect Path**: Providing a relative path that doesn't exist, leading to a file not found error during the test startup.
- **Putting `test.use` inside `test()`**: `test.use` must be called at the top level or inside a `test.describe()`, not inside the `test()` block itself.

## Summary
`test.use` is a powerful way to define or override configuration (like `storageState`) for a specific test file or suite without affecting the rest of the project.
