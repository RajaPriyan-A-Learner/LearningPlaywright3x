## Overview
Demonstrates an imperative helper function to perform UI login and explicitly save the resulting session state to disk.

## Main Concept
A reusable utility function that takes a `page` and `context`, drives the UI through a login flow, waits for confirmation, and exports the `storageState`.

```typescript
// helpers/authHelper.ts
import { type Page, type BrowserContext } from '@playwright/test';

interface SaveSessionOptions {
  storagePath?: string;
  username?: string;
  password?: string;
}

export async function loginAndSaveSession(
  page: Page,
  context: BrowserContext,
  options: SaveSessionOptions = {}
) {
  const user = options.username || process.env.VWO_USER;
  const pass = options.password || process.env.VWO_PASS;
  const storagePath = options.storagePath || './user-session.json';

  if (!user || !pass) {
    throw new Error('VWO_USER / VWO_PASS missing. Configure .env file.');
  }

  await page.goto('https://app.wingify.com/#/login');
  await page.locator('#login-username').fill(user);
  await page.locator('#login-password').fill(pass);
  await page.locator('#js-login-btn').click();

  // Wait until navigation confirms successful authentication
  await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

  // Save authenticated cookies and storage into target path
  await context.storageState({ path: storagePath });
  console.log(`Session state successfully saved to ${storagePath} ✅`);
}
```

## Line-by-Line Code Breakdown & Coder Rationale
- `export async function loginAndSaveSession(page: Page, context: BrowserContext, options...`: 
  - **Why the Coder Chose This:** Requires passing in Playwright's `page` and `context` objects so the function can drive the browser.
- `const user = options.username || process.env.VWO_USER;`:
  - **Why the Coder Chose This:** Checks passed arguments first, falling back to environment variables. This makes the function highly flexible for dynamic testing.
- `await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });`:
  - **Why the Coder Chose This:** Critical stabilization step. You cannot capture the storage state immediately after clicking login. You must wait for the application to actually set the cookies and redirect. The regex handles multiple potential landing pages.
- `await context.storageState({ path: storagePath });`:
  - **Why the Coder Chose This:** The core Playwright API to snapshot cookies and localStorage and write them out to a JSON file.
  - **Effective Alternative Ways:** This UI-driven login is slow and brittle. A modern, highly effective alternative is using Playwright's `request` context to hit the login API endpoint directly, capture the Auth token, and inject it into the context, completely bypassing the UI.

## Common Mistakes
- **Capturing state too early**: Calling `storageState()` before the network requests finish and cookies are set. Always `waitForURL` or `waitForResponse`.
- **Exposing secrets**: Committing the generated `.json` session files to version control. They should always be in `.gitignore`.

## Summary
Imperative helper functions are standard for generating session states on the fly or driving complex, multi-step UI login flows.
