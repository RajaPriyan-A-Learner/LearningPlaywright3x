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
