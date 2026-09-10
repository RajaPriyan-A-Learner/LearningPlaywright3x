# 232 — Multi-User Testing with Independent BrowserContexts

**File:** `29_Playwright/02_Playwright_Architecture/multiple_context.spec.ts`

## Overview
This file explores one of Playwright's most powerful architectural superpowers: driving **multiple isolated user sessions simultaneously** within a single browser process. By creating distinct `BrowserContext` instances (e.g. `adminContext` and `viewerContext`), tests can authenticate multiple personas (such as an Admin, a Manager, and a Viewer) side-by-side without session leakage or launching multiple browser binaries.

---

## Main Concept

In older tools like Selenium WebDriver, testing multi-user scenarios (such as an Admin inviting a Member, or a Customer chatting with a Support Agent) required launching separate browser instances or running tests sequentially.

### 1. BrowserContext as a Lightweight Security & State Boundary
A `BrowserContext` provides complete session isolation:
- **Separate Cookies:** Admin session cookies never bleed into the Viewer context.
- **Separate Web Storage:** `localStorage` and `sessionStorage` are fully isolated per context.
- **Independent Cache & Service Workers:** Network responses and service worker registrations remain sandboxed.
- **Microsecond Creation Time:** Creating an extra context costs only ~2 milliseconds, compared to ~2000 milliseconds for a new browser.

### 2. Multi-Role End-to-End Orchestration Pattern
In real-time collaborative applications (chat apps, CRM dashboards, e-commerce admin panels), both users interact on the same backend simultaneously:
1. `adminContext` publishes an update or grants permissions.
2. `viewerContext` observes the change reflected live via WebSocket or SSE.

### Working Code Example

```typescript
import { chromium, Browser, BrowserContext, Page } from "playwright";

async function multiUserCollaborationTest() {
    // 1. Launch a single browser engine
    const browser: Browser = await chromium.launch({ headless: false });

    // 2. Provision Admin context & page
    const adminContext: BrowserContext = await browser.newContext();
    const adminPage: Page = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin: session initialized in Context 1");

    // 3. Provision Viewer context & page (completely isolated)
    const viewerContext: BrowserContext = await browser.newContext();
    const viewerPage: Page = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer: session initialized in Context 2 (zero cookie leakage)");

    try {
        // Execute collaborative or permission-based assertions here
        console.log("Admin Title:", await adminPage.title());
        console.log("Viewer Title:", await viewerPage.title());
    } finally {
        // 4. Dispose contexts and shut down browser
        await adminContext.close();
        await viewerContext.close();
        await browser.close();
    }
}

multiUserCollaborationTest().catch(console.error);
```

---

## Common Mistakes

1. **Creating Multiple Pages in the Same Context for Different Users:** Calling `context.newPage()` twice opens two tabs that **share the same cookie jar and localStorage**. To test different user accounts, you MUST call `browser.newContext()` to obtain separate storage jars.
2. **Forgetting to Close Individual Contexts:** While `browser.close()` terminates the parent process and its children, explicitly closing contexts flushes HAR recordings, storage states, and trace files properly.
3. **Hardcoding Delays for Cross-User Synchronization:** Instead of using fixed sleeps (`waitForTimeout`) when waiting for an Admin action to appear on the Viewer screen, use web-first retrying assertions (`expect(viewerPage.locator(...)).toBeVisible()`).

---

## Summary
- A single `Browser` instance can spawn dozens of `BrowserContext` instances concurrently.
- `BrowserContext` isolation enables multi-user role testing (Admin vs Viewer, Buyer vs Seller) with zero state pollution and maximum hardware efficiency.
