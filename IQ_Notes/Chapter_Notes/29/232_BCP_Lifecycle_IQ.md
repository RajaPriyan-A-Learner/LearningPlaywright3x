# 232 — BCP Architecture: Browser, Context, and Page 3-Tier Hierarchy

**File:** `29_Playwright/e2e_tests/01_Basics/232_BCP.spec.ts`

## Overview
This file explores the core foundational paradigm of Playwright: the **BCP (Browser → Context → Page)** architecture. It demonstrates how Playwright establishes three distinct tiers of abstraction—from heavyweight browser operating system processes down to individual web page tabs—and why understanding their explicit creation and reverse-order disposal is essential for writing performant, leak-free automation suites.

---

## Main Concept

Unlike Selenium WebDriver which binds a single browser instance directly to a single driver session, Playwright decouples process execution from user profile sessions through a clear 3-level hierarchy:

```
┌────────────────────────────────────────────────────────┐
│ LEVEL 1: Browser (chromium.launch)                     │
│  - Heavyweight operating system process                │
│  - Manages browser binary, GPU, and rendering engine   │
│  - Launch once, reuse across thousands of tests        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ LEVEL 2: BrowserContext (browser.newContext)           │
│  - Ultra-lightweight in-memory profile sandbox         │
│  - Isolated cookies, cache, localStorage, permissions  │
│  - Zero overhead: created in ~2 milliseconds           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ LEVEL 3: Page (context.newPage)                        │
│  - A single tab or window inside the context           │
│  - Interacts with DOM, fires network events            │
│  - Inherits all context storage and authentication     │
└────────────────────────────────────────────────────────┘
```

### TypeScript Code Example

```typescript
import { chromium, type Browser, type BrowserContext, type Page } from "@playwright/test";

async function run() {
    // LEVEL 1: Launch browser — heaviest operation, do it once
    let browser: Browser = await chromium.launch({ headless: false });
    console.log("Browser Launched", browser);

    // LEVEL 2: Create context — fresh session, isolated cookies
    let context1: BrowserContext = await browser.newContext();
    console.log("Context created", context1);

    // LEVEL 3: Open page — a tab inside the context
    let page: Page = await context1.newPage();
    console.log("Page opened");

    // Cleanup — strict reverse order
    await page.close();
    await context1.close();
    await browser.close();
}

run();
```

### Key Points
- **Performance Advantage:** In Playwright Test runner, the `Browser` process is kept alive while each test receives a brand new `BrowserContext` and `Page`. This gives full isolation with zero process-spawn overhead.
- **Strict Reverse-Order Disposal:** Always close resources in the exact opposite order of instantiation: `page.close()` → `context.close()` → `browser.close()`.
- **Type-Only Imports:** Under modern TypeScript standards with `verbatimModuleSyntax: true`, type entities (`Browser`, `BrowserContext`, `Page`) must be imported using `type` specifiers.

---

## Common Mistakes
- **Launching a Browser Per Test:** Calling `chromium.launch()` inside every test case causes immense CPU spikes, excessive RAM consumption, and dramatically slows down execution.
- **Closing the Browser Before Contexts or Pages:** Terminating `browser.close()` abruptly while active pages or contexts are still processing can cause orphaned socket connections, unwritten trace files, or process crashes.
- **Assuming New Page Equals New Context:** Calling `context.newPage()` twice creates two tabs that share the *same* session and cookies. To test two distinct users, create two distinct contexts via `browser.newContext()`.

---

## Summary
**Key Takeaway:** The BCP model (Browser, Context, Page) separates heavy browser binaries from lightweight, completely isolated session profiles, providing enterprise speed, multi-tab coordination, and total session hygiene.
