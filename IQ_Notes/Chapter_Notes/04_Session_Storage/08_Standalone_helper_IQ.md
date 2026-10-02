## Overview
Demonstrates a standalone script that manually orchestrates Playwright's browser launch to generate session state, independent of the standard test runner fixtures.

## Main Concept
Instantiating Playwright's `chromium` engine manually via code (`chromium.launch()`) instead of relying on the `{ page }` fixture injected by `test()`.

```typescript
// helpers/saveSessionStandalone.ts
import { chromium } from '@playwright/test';

export async function saveSession(storagePath = './user-session.json') {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://app.wingify.com/#/login');
    await page.locator('#login-username').fill(process.env.VWO_USER!);
    await page.locator('#login-password').fill(process.env.VWO_PASS!);
    await page.locator('#js-login-btn').click();
    await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

    await context.storageState({ path: storagePath });
  } finally {
    await browser.close();
  }
}
```

## Line-by-Line Code Breakdown & Coder Rationale
- `import { chromium } from '@playwright/test';`:
  - **Why the Coder Chose This:** Directly imports the engine. This is required because we are outside a `test()` block and don't have fixtures.
- `const browser = await chromium.launch({ headless: true });`:
  - **Why the Coder Chose This:** Manually launches the browser process. `headless: true` ensures it runs invisibly, which is ideal for CI environments or quick local generation.
- `const context = await browser.newContext(); const page = await context.newPage();`:
  - **Why the Coder Chose This:** Reproduces what the default Playwright test runner does internally.
- `await page.locator(...).fill(process.env.VWO_USER!);`:
  - **Why the Coder Chose This:** The `!` (non-null assertion) tells TypeScript that we guarantee this environment variable exists, suppressing strict null checks.
- `} finally { await browser.close(); }`:
  - **Why the Coder Chose This:** Crucial resource management. The `finally` block guarantees that the browser process is killed even if the login fails or times out, preventing dangling zombie processes.
  - **Effective Alternative Ways:** Using standalone scripts is great for custom CLI tools or data seeding before a test run (like a `globalSetup`). However, Playwright's built-in Project dependencies (`setup` projects) are currently preferred because they integrate natively with Playwright's tracing and reporting UI.

## Common Mistakes
- **Leaking browsers**: Forgetting the `finally { await browser.close(); }` block.
- **Using this inside a `test()`**: You should not mix manual `chromium.launch` inside a `test()` block, as it conflicts with the test runner's orchestration and adds unnecessary overhead.

## Summary
Standalone helper scripts are powerful for external orchestration (like global setups or CI pre-flight scripts) when you don't have access to standard test fixtures.
