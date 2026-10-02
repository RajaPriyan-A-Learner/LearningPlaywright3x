## Overview
Demonstrates setting the session state at the global configuration level.

## Main Concept
By setting `use.storageState` in `playwright.config.ts`, every test across all projects will default to using this session unless overridden.

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://app.wingify.com',
    storageState: './playwright/.auth/user.json', // All specs inherit this state
  },
});
```

## Line-by-Line Code Breakdown & Coder Rationale
- `import { defineConfig } from '@playwright/test';`: Imports the configuration definition helper for type safety.
- `export default defineConfig({`: Exports the Playwright configuration.
- `use: {`: Defines options shared by all projects in this configuration.
- `baseURL: 'https://app.wingify.com',`: 
  - **Why the Coder Chose This:** Sets a base URL so tests can use relative paths like `page.goto('/dashboard')`.
- `storageState: './playwright/.auth/user.json',`: 
  - **Why the Coder Chose This:** Injects the authentication state into every single test. The coder chose this for a test suite where almost all tests require a logged-in user.
  - **Effective Alternative Ways:** While convenient, global state can be problematic if you have mixed tests (some logged out, some admin, some user). A more robust modern alternative is defining `projects` (Project-Level dependencies) where a specific "Logged In" project uses the state, rather than forcing it on everything globally.

## Common Mistakes
- **Forgetting to generate the file first**: If `./playwright/.auth/user.json` does not exist before running the tests, all tests will immediately fail.
- **Testing logged-out scenarios**: Tests that need to verify the login page or logged-out state will fail because they will automatically be logged in.

## Summary
Global `storageState` is the easiest way to apply authentication to an entire suite, but lacks flexibility for multi-role testing.
