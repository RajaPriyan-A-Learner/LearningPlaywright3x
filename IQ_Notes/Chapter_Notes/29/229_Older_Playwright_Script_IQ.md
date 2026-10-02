# 229 — Standalone Playwright Scripting & Manual Lifecycle Management

**File:** `29_Playwright/e2e_tests/01_Basics/229_Older_Playwright.spec.ts`

## Overview
This file demonstrates how Playwright can be executed as a standalone procedural script outside the Playwright Test runner (`@playwright/test` test runner framework). It covers manual initialization of the automation stack (`chromium.launch`), explicit session creation (`browser.newContext`), tab instantiation (`context.newPage`), page interaction, and deterministic reverse-order cleanup.

---

## Main Concept

Before using Playwright's automated test runner harness, understanding raw Playwright API mechanics helps engineers build custom web scrapers, automation bots, performance profiling utilities, and custom runner wrappers.

### The Explicit Automation Lifecycle Pipeline

In script mode, the engineer assumes 100% responsibility for resource allocation and disposal:

```
┌─────────────────┐      ┌────────────────────┐      ┌─────────────────┐
│ chromium.launch │ ───► │ browser.newContext │ ───► │ context.newPage │
└─────────────────┘      └────────────────────┘      └─────────────────┘
                                                              │
                                                              ▼
                                                     page.goto / actions
                                                              │
                                                              ▼
┌─────────────────┐      ┌────────────────────┐      ┌─────────────────┐
│  browser.close  │ ◄─── │   context.close    │ ◄─── │   page.close    │
└─────────────────┘      └────────────────────┘      └─────────────────┘
```

### TypeScript Code Example

```typescript
import { chromium, type Browser, type BrowserContext, type Page } from "@playwright/test";

async function run() {
    // 1. Launch browser process
    let browser: Browser = await chromium.launch({ headless: false });

    // 2. Open private incognito context
    let context: BrowserContext = await browser.newContext();

    // 3. Open browser tab
    let page: Page = await context.newPage();

    // 4. Navigate and interact
    await page.goto("https://example.com");
    console.log("Title:", await page.title());

    // 5. Cleanup — strict reverse order
    await page.close();
    await context.close();
    await browser.close();
}

run();
```

### Code Breakdown: `229_Older_Playwright.spec.ts`

**Line-by-line Explanation:**
*   `Line 1`: Imports the `chromium` browser driver and necessary TypeScript types (`Browser`, `BrowserContext`, `Page`).
*   `Line 3-18`: Declares the main async function `run()` to handle the full procedural flow.
*   `Line 4`: Manually launches the Chromium browser process with `headless: false` so the UI is visible.
*   `Line 5`: Creates a new `BrowserContext`, acting as an isolated incognito session.
*   `Line 6`: Opens a new `page` (tab) inside the context.
*   `Line 8`: Navigates to `https://example.com`.
*   `Line 9`: Retrieves and prints the page title to the console.
*   `Line 12-14`: Cleans up the resources explicitly in reverse order: first the page, then the context, then the browser process.
*   `Line 20`: Invokes the `run()` function.

**Why this approach was chosen:**
The coder chose this standalone script approach to demonstrate the underlying mechanics of Playwright without the abstraction of the `@playwright/test` test runner. This is useful for writing custom scraping scripts, utility bots, or learning exactly how Playwright handles resource allocation and memory management.

**Alternative Effective Way:**
If the goal is to write E2E tests, the alternative effective way is to use Playwright's test runner (`test` function from `@playwright/test`). This automatically handles the browser, context, and page creation/teardown via fixtures (e.g., `test('test', async ({ page }) => { ... })`). This is more effective for testing because it provides built-in parallelization, retries, reporting, and tracing without manual boilerplate.

### Key Points
- **Explicit Types:** Under TypeScript with `"verbatimModuleSyntax": true`, `Browser`, `BrowserContext`, and `Page` must be imported as type-only specifiers (`type Browser`, etc.).
- **Deterministic Teardown:** Resources must be closed in reverse order of creation (`page` → `context` → `browser`) to avoid hung processes and unreleased port locks.
- **Node Execution Compatibility:** Standalone scripts can be executed directly using `npx tsx` or compiled with `tsc` and executed via `node`.

---

## Common Mistakes
- **Omitting `headless: false` During Debugging:** By default, Playwright launches browsers in headless mode. Explicitly passing `{ headless: false }` makes the window visible for visual debugging.
- **Forgetting `await` on Async Calls:** Failing to await `page.goto()` or `browser.close()` can terminate Node before the network connection completes.
- **Mixing Standalone Scripting with Test Runner Constructs:** In standalone script mode, you cannot use test runner fixtures like `{ page }` or hooks like `test.beforeEach()`; you must manage the browser lifecycle manually.

---

## Summary
**Key Takeaway:** Standalone Playwright scripting exposes the raw Chromium DevTools Protocol client, giving developers total programmatic control over browser lifecycle, contexts, pages, and resource teardown.
