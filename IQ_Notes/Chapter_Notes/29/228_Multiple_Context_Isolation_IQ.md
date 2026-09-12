# 228 — Multi-User Testing with Independent BrowserContexts

**File:** `29_Playwright/e2e_tests/01_Basics/228_multiple_context.spec.ts`

## Overview
This file explores Playwright's distinct multi-tenant capability: spinning up multiple isolated `BrowserContext` instances within a single running browser process. By opening separate contexts for different user roles (such as an Admin and a Viewer), test suites can simulate concurrent multi-user workflows without session interference, cross-talk, or the heavy computational overhead of spawning multiple browser binaries.

---

## Main Concept

In traditional automation tools like Selenium, simulating two simultaneous users (e.g. Admin approving a request made by a Viewer) typically requires starting two completely separate browser instances, consuming gigabytes of RAM and leading to slow test execution.

### The BrowserContext Sandbox Architecture

Playwright decouples the browser process from user sessions:
- **`Browser`:** The physical binary process (Chromium, WebKit, Firefox). Spawning it is an expensive OS-level operation.
- **`BrowserContext`:** An ultra-lightweight, completely isolated incognito profile operating inside the browser. It owns its own:
  - Cookies and Session Storage
  - LocalStorage and IndexedDB
  - Cache and HTTP authentication state
  - Permissions and Geolocation settings

```
┌────────────────────────────────────────────────────────┐
│                   Chromium Browser                     │
│ ┌───────────────────────────┐┌───────────────────────┐ │
│ │       Admin Context       ││    Viewer Context     │ │
│ │  Cookies: admin_token=xyz ││ Cookies: view_token=1 │ │
│ │  Page: adminPage          ││ Page: viewerPage      │ │
│ └───────────────────────────┘└───────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### TypeScript Code Example

```typescript
import { chromium } from "@playwright/test";

async function multiUserTest() {
    let browser = await chromium.launch({ headless: false });

    // Admin Context & Tab
    let adminContext = await browser.newContext();
    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin: on login page");

    // Viewer Context & Tab (Completely isolated storage & session)
    let viewerContext = await browser.newContext();
    let viewerPage = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer: on login page");

    // Strict Reverse-Order Teardown
    await adminContext.close();
    await viewerContext.close();
    await browser.close();
}

multiUserTest();
```

### Key Points
- **Zero Cross-Talk:** Modifying cookies or logging in on `adminPage` has zero impact on `viewerPage`.
- **Resource Efficiency:** Spawning a new `BrowserContext` takes roughly 1–2 milliseconds and insignificant RAM, compared to hundreds of milliseconds and hundreds of megabytes for a new `Browser`.
- **Real-Time Collaboration Testing:** Ideal for chat applications, real-time doc editors (Google Docs clone), approval workflows, and role-based access control (RBAC).

---

## Common Mistakes
- **Creating Multiple Pages in the Same Context Expecting Isolation:** `const page2 = await adminContext.newPage()` shares cookies and localStorage with `page1`. To isolate sessions, you must call `browser.newContext()`.
- **Forgetting to Close Contexts:** Orphaned contexts leak memory and socket handles. Always ensure `await context.close()` is called or rely on Playwright's automatic test runner lifecycle.
- **Closing Browser Before Contexts Finish Cleanup:** Closing the parent browser abruptly can corrupt temporary profile folders or discard performance tracing data.

---

## Summary
**Key Takeaway:** Multiple `BrowserContext` instances provide enterprise-grade session isolation inside a single browser process, enabling ultra-fast, zero-overhead simulation of multi-role collaborative user workflows.
