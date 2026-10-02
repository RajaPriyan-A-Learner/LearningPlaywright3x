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

## Frequently Asked Questions (FAQ)

### 1. Hardcoding the Chromium engine vs. Firefox/WebKit
When the script explicitly imports and calls `chromium.launch()`, it will **only** run on Chromium. It will not automatically run on Firefox or WebKit. 
If you wanted this standalone script to support other engines, you would need to import them (`import { chromium, firefox, webkit } from '@playwright/test';`) and either pass the browser type as a parameter to your function or loop through them. This is one of the downsides of standalone scripts compared to Playwright's default test runner, which handles cross-browser execution automatically.

### 2. How to configure a customized standalone setup script
If you are using Playwright's `projects` array for setup (i.e., Project Dependencies), you typically wouldn't use this standalone `chromium.launch()` script. Instead, you would write a standard Playwright test (using the `page` fixture) and configure it in the `playwright.config.ts` like this:
```typescript
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
    dependencies: ['setup'], // This tells Playwright to run the setup project first
  },
]
```
If you still want to use the standalone script, you usually execute it **outside** of the Playwright configuration (e.g., running `npx ts-node helpers/saveSessionStandalone.ts` in your `package.json` scripts before running `npx playwright test`). Or, you can use it as a `globalSetup`.

### 3. File extensions in Enterprise Grade Frameworks (`*.setup.ts`, `*.globalsetup.ts`)
While Playwright doesn't strictly enforce file names for setups, enterprise frameworks adopt strong naming conventions to separate setup logic from actual tests. Common conventions include:
- `*.setup.ts` or `auth.setup.ts`: Used for Project Dependencies, e.g., logging in before tests.
- `global-setup.ts` or `global.setup.ts`: Used for Playwright's `globalSetup` hook, running once for the entire test suite.
- `*.teardown.ts`: Used for cleaning up data after tests.

Separating these from `*.spec.ts` ensures your test runner doesn't accidentally run setup files as standard test cases unless explicitly told to.

### 4. How to write and configure `globalSetup` and `setup` files

**Option A: Project Dependencies (Recommended Modern Approach)**
Write a standard test file, usually named `auth.setup.ts`:
```typescript
// auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('https://example.com/login');
  // ... login steps ...
  await page.context().storageState({ path: 'user-session.json' });
});
```
*Configuration in `playwright.config.ts`:* Set it up in the `projects` array as shown in question 2 above.

**Option B: Global Setup (Older/Alternative approach)**
Write a standalone function similar to the standalone helper script, but it must be a default export:
```typescript
// global-setup.ts
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  // ... manual context, page, and login steps ...
  await browser.close();
}
export default globalSetup;
```
*Configuration in `playwright.config.ts`:*
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'), // Points to your file
  // ... rest of config
});
```
