# 243_Custom_reporting_Test_wingify — Real-Time Custom HTML Reporting in Playwright

**File:** `29_Playwright/e2e_tests/05_Allure_Reporting/243_Custom_reporting_Test_wingify.spec.ts`

## Overview
This test spec demonstrates how Playwright test suites integrate with a bespoke enterprise custom reporter (`CustomReporter.ts`). By reusing saved session state (`user-session.json`), the test bypasses repeated login flows and navigates directly into authenticated dashboard routes across multiple concurrent test iterations. The run feeds real-time lifecycle metrics, step durations, and pass/fail statuses into a standalone live HTML dashboard.

---

## Main Concept

Standard built-in reporters (such as `list`, `dot`, or default `html`) write static outputs after the entire run completes. In contrast, an enterprise-grade custom reporter implements Playwright's `Reporter` interface hooks:

- `onBegin(config, suite)`: Initializes the real-time HTML dashboard with build metadata and total test counts.
- `onTestBegin(test, result)`: Streams in-flight execution events to the console and live dashboard.
- `onStepBegin` / `onStepEnd`: Captures granular action-level timings and logs.
- `onTestEnd(test, result)`: Records test outcomes, duration, attached screenshots, videos, and trace artifacts.
- `onEnd(result)`: Finalizes the run, diffs results against previous runs for flaky analysis, and produces the finalized standalone HTML report.

### Code Example

```typescript
import { test, expect } from "@playwright/test";

// Load pre-authenticated session state to bypass repetitive UI logins
test.use({
    storageState: './user-session.json'
});

test("go directly to dashboard — Test1", async ({ page }) => {
    await page.goto("https://app.wingify.com/#/dashboard?accountId=1281316");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded — no login needed ✅");
    await page.waitForTimeout(3000);
});

test("go directly to dashboard2 — Test2", async ({ page }) => {
    await page.goto("https://app.wingify.com/#/dashboard?accountId=1281316");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded — no login needed ✅");
    await page.waitForTimeout(3000);
});
```

### Key Points

- **Authentication Bypass with `storageState`:** Injecting cookies and local storage tokens directly into the `BrowserContext` allows each worker to land immediately on the dashboard, saving 5–10 seconds per test.
- **Pluggable Reporter Invocation:** The reporter can be invoked dynamically via command-line flags:
  ```bash
  npx playwright test e2e_tests/05_Allure_Reporting/243_Custom_reporting_Test_wingify.spec.ts --reporter=./utils/CustomReporter.ts
  ```
- **Real-Time Live Updates:** The reporter can continuously flush HTML/JSON status updates to disk so CI/CD pipelines and developers monitor live test execution without waiting for suite completion.

---

## Common Mistakes

- **Hardcoding Session Paths:** Referencing relative paths like `./user-session.json` without verifying the process's current working directory causes tests to fail silently or prompt for authentication. Prefer `path.resolve(__dirname, '../../user-session.json')` in production test setups.
- **Ignoring Session Expiry:** Authentication tokens and session cookies expire. If `user-session.json` contains expired credentials, tests fail at `toHaveURL(/dashboard/)` because the application redirects back to `/login`.
- **Throwing Errors in Reporter Hooks:** Unhandled exceptions inside custom reporter methods (e.g., `onTestEnd`) will crash the Playwright runner process before artifacts and subsequent test results are written.

---

## Summary
Custom reporting combined with authenticated state reuse gives teams immediate visibility into test run status. By streaming test lifecycle events from `onBegin` to `onEnd`, teams obtain actionable HTML dashboards complete with execution timing, console output, and failure diagnostics.
