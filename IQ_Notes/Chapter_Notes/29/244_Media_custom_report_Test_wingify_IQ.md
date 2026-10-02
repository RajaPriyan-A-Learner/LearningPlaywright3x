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

### Code Breakdown: `244_Media_custom_report_Test_wingify.spec.ts`

**Line-by-line Explanation:**
*   `Line 12-17`: Overrides the test configuration dynamically using `test.use()` to force the capture of screenshots, videos, and traces for *every* test, and applies the saved authentication state.
*   `Line 21-40`: Loops three times to dynamically generate three tests (`Test1`, `Test2`, `Test3`).
*   `Line 24-27`: Uses `test.step()` to wrap the dashboard navigation. This creates a logical grouping in the HTML/Allure report.
*   `Line 29-31`: Uses `test.step()` to explicitly verify that the login form (`#login-username`) is hidden, proving the session works.
*   `Line 33-38`: Uses `test.step()` to take a full-page screenshot and attaches it directly to the test results using `testInfo.attach()`.

**Why this approach was chosen:**
The coder chose `test.use` to force media collection specifically for this file, rather than enabling it globally in `playwright.config.ts`, which would slow down the entire suite. They used `test.step()` extensively to ensure the custom reporter generates a beautiful, nested tree of actions rather than a flat list of commands.

**Alternative Effective Way:**
Calling `page.screenshot({ fullPage: true })` inside every test iteration takes a significant amount of time and disk space, especially for large SPAs.
An alternative effective way, unless explicit visual regression testing is needed on every step, is to rely on Playwright's native `screenshot: 'only-on-failure'` in the config. For custom reports, you can utilize the automatic DOM snapshots inside the `trace.zip` rather than generating heavy standalone PNGs.

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

---

## Frequently Asked Questions (FAQ)

### Can we change the format of artifacts? (PNG to JPEG, WebM to MP4, ZIP to JSON)

**1. Screenshots (`.png` ➔ `.jpg` / `.jpeg`)**
- **Auto-screenshots (in config):** ❌ **No.** Playwright's built-in `screenshot: 'on'` configuration *always* generates `.png` files. You cannot change this globally.
- **Manual screenshots:** ✅ **Yes.** If you use `page.screenshot()`, you can explicitly set the `type` parameter to JPEG and attach it to your report manually:
  ```typescript
  // Taking a JPEG screenshot and attaching it
  await testInfo.attach('custom-screenshot', {
      body: await page.screenshot({ type: 'jpeg', quality: 80 }), // quality 0-100
      contentType: 'image/jpeg',
  });
  ```

**2. Video (`.webm` ➔ `.mp4`)**
- **Native Playwright:** ❌ **No.** Playwright only records videos in `.webm` format natively. This is because WebM recording is deeply integrated into Chromium and WebKit's rendering engines and is extremely fast and lightweight. MP4 requires heavy external encoders.
- **Workaround:** If your company *requires* `.mp4` (e.g., for compatibility with an older reporting dashboard), you must use a post-processing script with a tool like **FFmpeg** to convert the `.webm` files to `.mp4` after the test run completes.

**3. Traces (`.zip` ➔ `.json`)**
- **Native Playwright:** ❌ **No.** Playwright strictly generates traces as `.zip` archives. 
- **Why?** A trace is not just a single JSON file. It contains multiple files: `trace.network`, `trace.actions`, plus hundreds of tiny assets (CSS files, images, font files) needed to perfectly recreate the DOM snapshots in the Trace Viewer. 
- **Workaround:** If you are building a custom AI bot or dashboard and just want the JSON data of what actions occurred, you can technically **unzip** the `trace.zip` file programmatically using NodeJS (`adm-zip` or `yauzl`) and read the `trace.actions` JSON file inside it. However, you cannot tell Playwright to skip the `.zip` generation natively.
