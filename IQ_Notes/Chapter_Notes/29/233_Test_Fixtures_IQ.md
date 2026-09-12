# 233 — Test Fixtures: Automatic Isolation vs Custom Multi-Context Workflows

**File:** `29_Playwright/e2e_tests/01_Basics/233_Test_fixtures.spec.ts`

## Overview
This file demonstrates the practical difference between using Playwright's default built-in `{ page }` test fixture and utilizing the lower-level `{ browser }` fixture. It illustrates how standard tests take advantage of automatic fixture teardown, and how complex multi-role workflows (such as simulating Admin, User, and Guest interacting with different applications simultaneously) can be orchestrated by spinning up multiple contexts on-demand.

---

## Main Concept

Playwright's fixture system provides dependency injection for tests. Rather than writing boilerplate setup and teardown code in every file, test functions declare the resources they need in their signature.

### Built-in Fixture Levels

```
                     ┌─────────────────────────────┐
                     │          { browser }        │
                     │  Shared browser instance    │
                     └──────────────┬──────────────┘
                                    │
                        Provides    ▼
                     ┌─────────────────────────────┐
                     │          { context }        │
                     │  Default isolated context   │
                     └──────────────┬──────────────┘
                                    │
                        Provides    ▼
                     ┌─────────────────────────────┐
                     │           { page }          │
                     │  Default single tab in ctx  │
                     └─────────────────────────────┘
```

1. **`{ page }` Fixture:** The most common fixture. Playwright automatically creates a new `BrowserContext`, creates a `Page`, injects it into your test function, and automatically disposes of both when the test finishes.
2. **`{ browser }` Fixture:** Used when a single test needs to orchestrate multiple independent contexts (e.g. multi-user chat, role-based workflows, admin vs client validation).

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

// Test 1: Simple single-page test using auto-managed { page } fixture
test("Navigating to the tta website", async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/");
});

// Test 2: Multi-role concurrent testing using the { browser } fixture
test("BCP - in app.vwo.com two roles", async ({ browser }) => {
    // Instantiate 3 isolated contexts representing 3 independent roles
    let adminContext = await browser.newContext();
    let userContext  = await browser.newContext();
    let guestContext = await browser.newContext();

    // Create pages for each role and navigate concurrently
    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.thetestingacademy.com/playwright/");

    let userPage = await userContext.newPage();
    await userPage.goto("https://sdet.live");

    let guestPage = await guestContext.newPage();
    await guestPage.goto("https://scrolltest.com");

    // Explicit cleanup for custom contexts created inside the test
    await adminPage.close();
    await userPage.close();
    await guestPage.close();
    
    await adminContext.close();
    await userContext.close();
    await guestContext.close();
});
```

### Key Points
- **Automated Lifecycle vs Manual Teardown:** The `{ page }` fixture is automatically torn down by Playwright's test worker. However, any additional `BrowserContext` instances manually created via `browser.newContext()` inside a test block should be explicitly closed.
- **True Multi-Site Concurrent Sessions:** The second test demonstrates navigating three completely different domains simultaneously with zero cookie bleeding.
- **Fixture Composability:** Custom fixtures can be defined by extending `test.extend<MyFixtures>({})` to provide reusable authenticated contexts across an entire test suite.

---

## Common Mistakes
- **Requesting `{ page }` When Creating Manual Contexts:** Requesting both `{ page, browser }` and then only using `browser.newContext()` unnecessarily creates and destroys an unused default context and page.
- **Forgetting to Close Manually Created Contexts:** While Playwright closes worker browsers when workers exit, leaking unclosed contexts inside long-running test suites leads to memory bloat.
- **Typos in Variable Names:** Mistyping context names (e.g. `guestConetxt` instead of `guestContext`) causes silent confusion during maintenance.

---

## Summary
**Key Takeaway:** Playwright fixtures (`page`, `context`, `browser`) eliminate boilerplate setup and teardown. The `{ page }` fixture handles single-user tests automatically, while the `{ browser }` fixture unlocks advanced multi-role, multi-domain concurrent testing scenarios.
