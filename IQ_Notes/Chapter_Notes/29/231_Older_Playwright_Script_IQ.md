# 231 — Standalone Playwright Scripting & Manual Lifecycle Management

**File:** `29_Playwright/02_Playwright_Architecture/Older_Playwright.spec.ts`

## Overview
This file demonstrates the foundational, standalone Playwright API pattern outside of `@playwright/test` test runner abstractions. It explicitly launches an automation instance using `chromium.launch()`, provisions a lightweight `BrowserContext` via `browser.newContext()`, opens a tab via `context.newPage()`, performs navigation and title retrieval, and enforces manual resource teardown in reverse order.

---

## Main Concept

Before the modern `@playwright/test` runner provided automated fixture injection and zero-boilerplate lifecycle management, developers interacted directly with Playwright's core driver hierarchy.

### 1. The Three-Tier Object Hierarchy
- **`Browser` (`chromium.launch`):** Represents an active browser operating system process. Launching a browser is expensive (500ms - 2000ms), which is why real-world test architectures reuse a single browser process across worker lifecycles.
- **`BrowserContext` (`browser.newContext`):** Represents an isolated, incognito session with its own cookie jar, localStorage, cache, and network rules. Contexts take only ~2ms to create and teardown.
- **`Page` (`context.newPage`):** Represents a single browser window or tab inside a context.

### 2. The Strict Reverse-Teardown Rule
Manual standalone scripts must explicitly clean up resources in reverse order of creation:
```
Page.close()  ──>  BrowserContext.close()  ──>  Browser.close()
```
Failing to close contexts or browser processes leads to orphan headless Chromium processes consuming CPU and memory on host machines or CI agents.

### Working Code Example

```typescript
import { chromium, Browser, BrowserContext, Page } from "playwright";

async function run() {
    // 1. Launch Browser Process
    const browser: Browser = await chromium.launch({ headless: false });

    // 2. Create Isolated BrowserContext (incognito profile)
    const context: BrowserContext = await browser.newContext();

    // 3. Open New Tab (Page)
    const page: Page = await context.newPage();

    try {
        // 4. Navigate and inspect DOM
        await page.goto("https://example.com");
        const title: string = await page.title();
        console.log("Page Title:", title);
    } finally {
        // 5. Cleanup in strict reverse order to prevent orphan processes
        await page.close();
        await context.close();
        await browser.close();
    }
}

run().catch(console.error);
```

---

## Common Mistakes

1. **Missing `try...finally` in Standalone Scripts:** If an error or assertion fails before `browser.close()`, the script crashes and leaves headless browser instances lingering in memory. Always wrap standalone execution in `try...finally`.
2. **Re-launching `browser` Instead of `context`:** Beginners often call `chromium.launch()` inside loops, wasting seconds per iteration. The correct Playwright pattern is launching the `browser` once and creating fresh `BrowserContext` instances per iteration.
3. **Omitting `await` on Asynchronous Calls:** Calling `page.goto()` or `browser.close()` without `await` initiates remote procedure calls asynchronously without holding the promise, causing race conditions and unhandled rejection errors.

---

## Summary
- Direct scripting via `playwright` exposes the raw three-tier hierarchy: `Browser` ➔ `BrowserContext` ➔ `Page`.
- While modern test automation prefers `@playwright/test` fixtures (`async ({ page }) => {}`), understanding standalone lifecycle management is critical for custom scraping pipelines, backend integration services, and debugging low-level driver interactions.
