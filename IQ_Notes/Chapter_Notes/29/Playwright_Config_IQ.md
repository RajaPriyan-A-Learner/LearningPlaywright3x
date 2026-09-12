# Playwright Configuration & Multi-Browser Test Runner Setup

**File:** `29_Playwright/playwright.config.ts`

## Overview
This file explores the core runner configuration of Playwright Test via `defineConfig`. It specifies how tests are discovered (`testDir`), executed in parallel (`fullyParallel`, `workers`), retried under CI environments (`retries`, `forbidOnly`), reported (`reporter: 'html'`), debugged via traces and video recordings (`trace: 'on-first-retry'`, `video: 'retain-on-failure'`), and executed across multi-engine browser matrices (Chromium, Firefox, WebKit).

---

## Main Concept

The `playwright.config.ts` file acts as the centralized control plane for the entire Playwright test suite. Instead of configuring options per-test, global policies and environment-specific behaviors are declared declaratively.

### Core Configuration Architecture

1. **Test Discovery & Execution Engine:**
   - `testDir`: Sets root directory for automated spec discovery.
   - `fullyParallel: true`: Executes tests inside individual files concurrently across worker processes.
   - `forbidOnly`: Fails the build on CI if a rogue `test.only()` was committed.
   - `retries`: Automatically re-runs failed tests on CI to mitigate network flakiness.

2. **Debugging Artifacts & Browser Settings:**
   - `use.headless`: Configures headless vs headed execution.
   - `use.trace`: Captures DOM snapshots, console logs, network activity, and action filmstrips upon test retry.
   - `use.video`: Records test execution video when failures occur.

3. **Cross-Browser Multi-Engine Matrix:**
   - Multi-project definitions map each test across `chromium`, `firefox`, and `webkit` using predefined device profiles (`devices['Desktop Chrome']`).

### TypeScript Code Example

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e_tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://app.thetestingacademy.com',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: process.env.CI ? true : false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

### Key Points
- **Worker Isolation:** Each worker process runs in its own isolated Node.js environment with distinct BrowserContexts, preventing shared state leakage across tests.
- **Trace Viewer Value:** `trace: 'on-first-retry'` saves disk space during passing runs while delivering complete time-travel debugging on failures.
- **Project-Level Overrides:** Individual projects can override global settings (e.g. mobile viewports, permissions, geolocation, or HTTP credentials).

---

## Common Mistakes
- **Hardcoding `headless: false` on CI:** Running headed mode in headless CI containers (e.g. GitHub Actions / Docker) without Xvfb causes tests to crash immediately.
- **Omitting `forbidOnly` on CI pipelines:** Forgetting `forbidOnly: !!process.env.CI` allows accidental `test.only` commits to pass CI even though 99% of test suites were skipped.
- **Turning on `video: 'on'` unconditionally in large suites:** Storing full video recordings for thousands of passing tests leads to massive disk and memory overhead. Use `'retain-on-failure'`.

---

## Summary
**Key Takeaway:** `playwright.config.ts` establishes end-to-end testing defaults, worker parallelism, trace capture policies, and multi-browser execution matrices across local and CI environments.
