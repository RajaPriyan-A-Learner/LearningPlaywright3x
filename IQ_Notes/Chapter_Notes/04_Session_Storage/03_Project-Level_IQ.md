## Overview
Demonstrates configuring Playwright projects with dependencies to handle multi-role authentication seamlessly.

## Main Concept
Using Playwright's `projects` array and `dependencies`, you can create a "setup" project that runs first to generate auth states, and subsequent projects that consume those states based on user roles.

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // 1. Setup project — runs auth once before tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // 2. Standard User Project
    {
      name: 'chromium-user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    // 3. Admin User Project
    {
      name: 'chromium-admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/admin.json',
      },
      dependencies: ['setup'],
    },
    // 4. Logged-Out / Public Specs
    {
      name: 'logged-out',
      testMatch: /.*\.logged-out\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

## Line-by-Line Code Breakdown & Coder Rationale
- `projects: [`: Defines logical groupings of tests.
- `{ name: 'setup', testMatch: /.*\.setup\.ts/ },`: 
  - **Why the Coder Chose This:** Creates a dedicated setup phase. This project only runs files ending in `.setup.ts` which generate the `.json` session files.
- `{ name: 'chromium-user', ... dependencies: ['setup'] }`: 
  - **Why the Coder Chose This:** This project waits for the `setup` project to finish (`dependencies: ['setup']`), guaranteeing the `storageState` file is ready before these tests run.
  - **Effective Alternative Ways:** This is currently the most idiomatic and recommended way in Playwright 1.31+ to handle authentication. Alternatively, one could use a Global Setup file (`globalSetup: ...`), but project dependencies are preferred because they support UI mode, tracing, and can be run in parallel.
- `{ name: 'logged-out' ... }`: 
  - **Why the Coder Chose This:** Isolates tests that shouldn't have any injected auth state.

## Common Mistakes
- **Missing dependencies array**: If `dependencies: ['setup']` is missing, tests will run in parallel with the setup and crash because the JSON file isn't written yet.

## Summary
Project-level authentication dependencies represent the most robust, scalable way to manage multiple user roles in Playwright test suites.
