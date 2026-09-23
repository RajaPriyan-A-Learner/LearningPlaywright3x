# 244_Media_custom_report_Test_wingify — Media Artifact Capture & AI Reporting in Playwright

**File:** `29_Playwright/e2e_tests/05_Allure_Reporting/244_Media_custom_report_Test_wingify.spec.ts`

## Overview
This test spec demonstrates comprehensive media capture in Playwright—enabling full-page screenshots, video recordings, and execution traces for every test run regardless of outcome. In addition to system-captured media, it shows how tests can attach custom named screenshots programmatically via `testInfo.attach()`, providing rich visual artifacts for custom HTML reports and AI-powered root-cause analysis (RCA) agents.

---

## Main Concept

Debugging modern web applications requires multi-modal evidence. Playwright allows fine-grained declarative configuration of media collection via `test.use()` or `playwright.config.ts`:

- `screenshot: 'on'`: Automatically captures a screenshot upon test completion.
- `video: 'on'`: Records a `.webm` screencast of the entire browser page viewport during execution.
- `trace: 'on'`: Packages DOM snapshots, network requests, console logs, and action timings into a zip archive for time-travel inspection.
- `testInfo.attach()`: Programmatically binds custom buffers, JSON logs, or named screenshots directly to the test's execution record.

### Code Example

```typescript
import { test, expect } from "@playwright/test";

test.use({
    storageState: './user-session.json',
    screenshot: 'on',   // attach a PNG for every test, pass or fail
    video: 'on',        // record a .webm for every test
    trace: 'on',        // attach a trace.zip for every test
});

const DASHBOARD = "https://app.wingify.com/#/dashboard?accountId=1281316";

for (const n of [1, 2, 3]) {
    test(`dashboard loads with media captured — Test${n}`, async ({ page }, testInfo) => {

        await test.step('open the dashboard', async () => {
            await page.goto(DASHBOARD);
            await expect(page).toHaveURL(/dashboard/);
        });

        await test.step('confirm we are not on the login screen', async () => {
            await expect(page.locator('#login-username')).toBeHidden();
        });

        await test.step('attach a named screenshot', async () => {
            await testInfo.attach(`dashboard-test${n}`, {
                body: await page.screenshot({ fullPage: true }),
                contentType: 'image/png',
            });
        });
    });
}
```

### Key Points

- **`test.step()` for Hierarchical Traceability:** Breaking test logic into named steps creates distinct collapsible entries in the custom HTML report and trace viewer with individual timing indicators.
- **Custom Attachments with `testInfo.attach`:** Beyond automatic screenshots, manual attachments allow developers to capture intermediate application states (e.g., dynamic charts, modal states, or data tables) labeled with meaningful names.
- **AI-Driven Flaky & Root Cause Analysis:** Media assets provide raw input for automated agents:
  - **Flaky Analyzer:** Diffs per-test outcomes across consecutive builds to flag non-deterministic behavior.
  - **Self-Heal Agents:** Analyzes broken locator errors and live page DOM to recommend resilient ARIA alternatives.

---

## Common Mistakes

- **Leaving Video and Tracing 'on' for Every CI Test:** While recording video and traces on every test is great for local debugging, doing so across thousands of tests in CI consumes excessive disk space and increases execution overhead. Prefer `'retain-on-failure'` or `'on-first-retry'` in production CI/CD pipelines.
- **Forgetting `await` on `testInfo.attach`:** While `testInfo.attach` accepts buffers synchronously, awaiting promise-based capture (like `page.screenshot()`) inside the call is required to avoid attaching empty or unfulfilled data.
- **Video Availability Timing:** Videos are finalized only when the browser context closes. Accessing the video path prematurely inside `testInfo` before context teardown returns incomplete or locked files.

---

## Summary
Rich media capture transforms test automation reports from simple green/red scorecards into full diagnostic dashboards. With screenshots, video replays, and step-level traces embedded directly into custom HTML reports, engineers and AI assistants can isolate and remediate regressions with zero guesswork.
