# Session_Storage_Authentication_State — Persisting & Reusing Auth State in Playwright

**File:** `29_Playwright/e2e_tests/04_Session_Storage/Session_storage.ts`

## Overview
This script demonstrates how to authenticate once in Playwright, export the authenticated browser state (including cookies, session tokens, and local storage values), and save it to a JSON file (`user-session.json`). Subsequent test suites load this saved state to bypass repetitive UI login screens entirely, cutting overall test suite execution time significantly.

---

## Main Concept

In standard end-to-end testing, logging in via the UI before every test is computationally expensive and introduces flakiness. Playwright provides built-in state serialization via `context.storageState()`:

1. **Authentication:** The test opens the login page, enters credentials loaded securely from environment variables (`.env`), and clicks submit.
2. **URL Synchronization:** `page.waitForURL(/#\/(dashboard|home)/)` confirms authentication and cookie storage have completed.
3. **Serialization:** `await context.storageState({ path: './user-session.json' })` serializes all cookies, session storage, and local storage into a JSON snapshot.
4. **Reuse:** Downstream tests consume the snapshot via `test.use({ storageState: './user-session.json' })`.

### Code Example

```typescript
import { chromium } from 'playwright';
import dotenv from "dotenv";

dotenv.config();

export default async function saveSession() {
    const VWO_USER = process.env.VWO_USER;
    const VWO_PASS = process.env.VWO_PASS;

    if (!VWO_USER || !VWO_PASS) {
        throw new Error("VWO_USER / VWO_PASS not found. Add them to .env");
    }

    const browser = await chromium.launch({ headless: false });
    try {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://app.wingify.com/#/login");
        await page.locator("#login-username").fill(VWO_USER);
        await page.locator("#login-password").fill(VWO_PASS);
        await page.locator("#js-login-btn").click();

        // Wait until navigation reaches authenticated destination
        await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

        // Save authenticated storage state to disk
        await context.storageState({ path: "./user-session.json" });
        console.log("Session saved to user-session.json ✅");
    } finally {
        await browser.close();
    }
}
```

### Key Points

- **Dramatic Execution Speedup:** Reduces multi-test suite duration by avoiding login form rendering, credential transmission, and redirect latency on every test.
- **Context Isolation:** Each test worker still receives its own fresh, isolated `BrowserContext` initialized with the saved storage state, preserving test independence.
- **Fail-Fast Configuration:** Checking for credentials before launching browser instances prevents lingering zombie browser processes.
- **Secure Handling:** Storage state files contain sensitive bearer tokens and session cookies. Never commit `user-session.json` or `.env` to public repositories.

---

## Common Mistakes

- **Saving State Too Early:** Calling `context.storageState()` immediately after clicking the submit button without waiting for redirection (`waitForURL`) results in an empty or unauthenticated session file.
- **Committing Auth Tokens to Git:** Accidental commits of `user-session.json` or `.env` files expose live application credentials and active session tokens.
- **Failing to Wrap in `try/finally`:** If login times out or fails without a `finally { await browser.close(); }` block, headless or headed browser processes remain open in the background.

---

## Summary
Reusing browser storage state via `context.storageState()` is a foundational best practice in modern Playwright architecture. By authenticating once and reusing credentials across test suites, teams eliminate login flakiness, reduce infrastructure costs, and drastically accelerate CI pipeline execution.
