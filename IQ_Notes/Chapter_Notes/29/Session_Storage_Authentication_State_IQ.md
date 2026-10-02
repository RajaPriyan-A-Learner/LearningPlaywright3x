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

## All Ways to Import / Consume `storageState` in Test Specs (Enterprise-Grade)

In enterprise test frameworks, managing authentication state requires balancing test isolation, multi-role testing (e.g., Admin vs User), and parallel worker scalability. Playwright offers **5 distinct approaches**:

### 1. File / Suite-Level Override via `test.use()` (As used in `241_Test_wingify.spec.ts`)
Applies the storage state to all tests in the current spec file or `test.describe` block.

```typescript
import { test, expect } from '@playwright/test';

// Scoped to this file or describe block
test.use({ storageState: './user-session.json' });

test('Direct Dashboard Navigation', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/dashboard/);
});
```
* **Pros:** Explicit, localized, and great for tests dedicated to a specific role.
* **Cons:** Hardcoded relative paths across multiple spec files violate DRY principles.

---

### 2. Global Level via `playwright.config.ts` (Global Config)
Applies a baseline authenticated session across every test in your entire repository automatically without any import in `.spec.ts` files.

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
* **Enterprise Use-Case:** Standard apps where 90%+ of the test suites require a default logged-in session.
* **Bypassing in unauthenticated tests:** Use `test.use({ storageState: { cookies: [], origins: [] } })` in login or signup specs.

---

### 3. Project-Level Segmentation with Multi-Role Dependencies (Recommended Industry Standard)
The official enterprise architecture recommended by Playwright. You define a `setup` project that runs first to create the session, and separate test projects consuming different role sessions.

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
* **Pros:** Spec files contain zero auth boilerplate! Just write tests.
* **Scale:** Seamlessly parallelized across CI runners without redundant logins.

---

### 4. Dynamic Context-Level Consumption via `browser.newContext()`
For tests requiring **multi-user interaction** within the same test (e.g., Chat, Manager approving an Employee's request, Transferring funds).

```typescript
test('Manager approves Employee request', async ({ browser }) => {
    // Context 1: Employee
    const employeeContext = await browser.newContext({
        storageState: './playwright/.auth/employee.json'
    });
    const employeePage = await employeeContext.newPage();
    await employeePage.goto('/requests/new');
    await employeePage.getByRole('button', { name: 'Submit' }).click();

    // Context 2: Manager (same browser instance, different isolated auth)
    const managerContext = await browser.newContext({
        storageState: './playwright/.auth/manager.json'
    });
    const managerPage = await managerContext.newPage();
    await managerPage.goto('/admin/approvals');
    await expect(managerPage.getByText('New Request')).toBeVisible();

    await employeeContext.close();
    await managerContext.close();
});
```
* **Pros:** Ultimate flexibility for peer-to-peer, chat, and approval workflow validation.

---

### 5. Custom Fixture Injection (Custom Fixtures Layer)
Encapsulate session paths into reusable fixtures for clean, strongly-typed spec files.

```typescript
// fixtures.ts
import { test as base } from '@playwright/test';

type AuthRole = {
  adminPage: Page;
  userPage: Page;
};

export const test = base.extend<AuthRole>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/admin.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

// In spec file:
test('Admin dashboard check', async ({ adminPage }) => {
  await adminPage.goto('/admin');
});
```

---

### 6. Reusable Helper Functions Inside Test Files (On-Demand & Hook Invocations)

Often you need to extract the session-saving logic into a reusable function so any test spec can generate, refresh, or conditionally create sessions on the fly without duplicating login boilerplates.

#### Pattern A: Reusable Helper using Existing Test Fixtures (`page` & `context`) — *Recommended*
Reuses the test worker's existing browser instance rather than spawning extra browsers.

```typescript
// helpers/authHelper.ts
import { Page, BrowserContext } from '@playwright/test';

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

**Calling inside any Test Spec:**
```typescript
// e2e_tests/feature.spec.ts
import { test, expect } from '@playwright/test';
import { loginAndSaveSession } from '../helpers/authHelper';

test.describe('Dynamic / Conditional Auth Suite', () => {

  // Option 1: Call directly inside a setup test
  test('Login and generate session state', async ({ page, context }) => {
    await loginAndSaveSession(page, context, {
      storagePath: './playwright/.auth/custom-user.json'
    });
  });

  // Option 2: Call inside any test step dynamically
  test('Test requiring fresh state capture', async ({ page, context }) => {
    await loginAndSaveSession(page, context, {
      username: 'custom_admin@vwo.com',
      storagePath: './playwright/.auth/admin-user.json'
    });
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

#### Pattern B: Standalone Self-Contained Helper (Callable inside `beforeAll` / Scripts)
Spawns and closes its own browser context cleanly. Great for pre-test hooks checking if cached auth already exists.

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

**Calling inside `test.beforeAll()` with file existence check:**
```typescript
// e2e_tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';
import { saveSession } from '../helpers/saveSessionStandalone';
import fs from 'fs';

const SESSION_FILE = './user-session.json';

test.describe('Dashboard Tests', () => {
  // Generate session only if missing on disk
  test.beforeAll(async () => {
    if (!fs.existsSync(SESSION_FILE)) {
      await saveSession(SESSION_FILE);
    }
  });

  test.use({ storageState: SESSION_FILE });

  test('Navigate directly to dashboard', async ({ page }) => {
    await page.goto('https://app.wingify.com/#/dashboard');
    await expect(page.locator('.dashboard-header')).toBeVisible();
  });
});
```

---

### Comparison Matrix for Enterprise Production Code

| Method | Where It's Configured | Best For | Production Rating |
| :--- | :--- | :--- | :--- |
| **`playwright.config.ts` Projects** | `playwright.config.ts` | Complete test suites with roles (Admin/User/Guest) | ⭐️⭐️⭐️⭐️⭐️ (Best Practice) |
| **Custom Fixtures** | Custom fixture file | Strongly-typed role pages & multi-actor workflows | ⭐️⭐️⭐️⭐️⭐️ (Cleanest Specs) |
| **Reusable Helper Function** | `helpers/` called in `beforeAll` or test body | Dynamic session generation, ad-hoc login snapshots | ⭐️⭐️⭐️⭐️ (Flexible & Modular) |
| **`test.use({ storageState })`** | Spec file / `describe` block | Quick overrides or isolated single-spec needs | ⭐️⭐️⭐️ (Good for simple suites) |
| **`browser.newContext()`** | Inside single test body | Multi-user interactions in real-time | ⭐️⭐️⭐️⭐️ (Required for Multi-User) |
| **Global `use.storageState`** | Top-level `playwright.config.ts` | Apps with only 1 user type everywhere | ⭐️⭐️⭐️ (Rigid if guest pages exist) |

---

## Common Mistakes

- **Saving State Too Early:** Calling `context.storageState()` immediately after clicking the submit button without waiting for redirection (`waitForURL`) results in an empty or unauthenticated session file.
- **Committing Auth Tokens to Git:** Accidental commits of `user-session.json` or `.env` files expose live application credentials and active session tokens.
- **Failing to Wrap in `try/finally`:** If login times out or fails without a `finally { await browser.close(); }` block, headless or headed browser processes remain open in the background.

---

## Summary
Reusing browser storage state via `context.storageState()` is a foundational best practice in modern Playwright architecture. By authenticating once and reusing credentials across test suites, teams eliminate login flakiness, reduce infrastructure costs, and drastically accelerate CI pipeline execution.
