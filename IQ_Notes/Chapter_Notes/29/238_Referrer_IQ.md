# 238 — Context-Level HTTP Headers & Custom Referer Configuration

**File:** `29_Playwright/e2e_tests/03_Locator_Commands/238_Referrer.spec.ts`

## Overview
This file demonstrates how to configure global HTTP request headers—specifically the `Referer` header—at the `BrowserContext` level using `browser.newContext({ extraHTTPHeaders: { 'Referer': '...' } })`. It highlights how all pages and subsequent navigations spawned within that context inherit the custom HTTP header, making it an essential technique for testing affiliate tracking links, campaign attribution, partner referral validation, and bypassing CORS/CSRF referer checks.

---

## Main Concept

In web applications, the HTTP `Referer` (historically misspelled with a single 'r' in RFC 1945 / RFC 7231) header identifies the address of the webpage that linked to the resource being requested. Websites frequently inspect this header for:
1. **Attribution & Analytics:** Crediting sales/signups to marketing affiliates and partner domains.
2. **Security & Hotlinking Prevention:** Restricting API access or asset loading unless referred by a trusted origin.
3. **Access Control:** Enforcing specific user journey flows (e.g., preventing users from hitting `/checkout` directly without visiting `/cart`).

### Three Levels of Header Configuration in Playwright

Playwright offers three mechanisms for injecting HTTP headers:

| Level | API | Scope | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **Context-Level** | `browser.newContext({ extraHTTPHeaders: { ... } })` | Entire context (all pages, iframes, and worker fetch requests) | Global session headers like `Referer`, `Authorization: Bearer <token>`, custom feature flags. |
| **Page Navigation-Level** | `page.goto(url, { referer: '...' })` | Initial document request only | Testing single page landing behavior with a specific referrer. |
| **Route Interception-Level** | `page.route('**/*', route => route.continue({ headers }))` | Selective URLs | Dynamic header mutation or mocking responses per endpoint. |

### Context Inheritance Mechanics

When configuring `extraHTTPHeaders` at the `BrowserContext` level:
```
[ browser.newContext({ extraHTTPHeaders: { "Referer": "https://thetestingacademy.com" } }) ]
       │
       ├──► [ Page 1: app.vwo.com/#login ] ─────────────► Sent HTTP Header: Referer: https://thetestingacademy.com
       │
       └──► [ Page 2: katalon-demo-cura.../profile ] ──► Sent HTTP Header: Referer: https://thetestingacademy.com
```
Both `page.goto()` calls automatically forward the specified `Referer` header across distinct origins without needing manual per-request re-configuration.

### TypeScript Code Example

```typescript
import { test, expect } from "@playwright/test";

test("set referer for entire context across multiple navigations", async ({ browser }) => {
    // 1. Create a BrowserContext with context-wide extra HTTP headers
    const context = await browser.newContext({
        extraHTTPHeaders: {
            "Referer": "https://thetestingacademy.com"
        }
    });

    const page = await context.newPage();

    // 2. Set up a network listener to verify outgoing request headers
    let capturedReferer = '';
    page.on('request', (request) => {
        if (request.isNavigationRequest()) {
            capturedReferer = request.headers()['referer'] || '';
        }
    });

    // 3. Navigate to First Target — Partner referer is automatically included
    await page.goto("https://app.vwo.com/#login");
    console.log("Page 1 — partner referer included:", capturedReferer);
    expect(capturedReferer).toBe("https://thetestingacademy.com");

    // 4. Navigate to Second Target — Context maintains header across different origins
    await page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
    console.log("Page 2 — partner referer included:", capturedReferer);
    expect(capturedReferer).toBe("https://thetestingacademy.com");

    // 5. Clean up context resources
    await context.close();
});
```

### Key Points
- **RFC Spelling Quirk:** The HTTP header is spelled `Referer` (single 'r'), but the JavaScript DOM property is `document.referrer` (double 'r'). Playwright's `extraHTTPHeaders` map uses the HTTP header name `"Referer"`.
- **Global Inheritance:** Every asset request (scripts, stylesheets, images, fetch/XHR calls) initiated by any page inside the context will transmit this header unless overridden by browser security policies.
- **Multi-Tenant Test Safety:** Because `BrowserContext` instances are strictly isolated, setting headers on one context will never leak into or affect other parallel test workers.

---

## Common Mistakes

- **Confusing `extraHTTPHeaders` with `page.goto({ referer })`:** Setting `{ referer }` inside `page.goto(url, { referer: '...' })` only applies to the primary document request of that specific navigation. Sub-resource requests (XHR, API calls) and future navigations will not retain it.
- **Misspelling the Header Name:** Using `"Referrer"` (double 'r') instead of `"Referer"` in `extraHTTPHeaders`. While some modern web servers normalize headers, strict servers and CDNs reject or ignore the misspelled key.
- **Unintended Header Leakage to 3rd-Party Domains:** Setting sensitive headers (like `Authorization`) in global `extraHTTPHeaders` causes those credentials to be sent to external CDNs or analytics trackers. For domain-scoped headers, prefer `page.route()`.
- **Forgetting Context Cleanup:** When manually instantiating `browser.newContext()` instead of using the `{ page }` test fixture, always call `await context.close()` to avoid memory and socket leaks.

---

## Summary
**Key Takeaway:** Configuring `extraHTTPHeaders: { "Referer": "..." }` on a Playwright `BrowserContext` globally sets the HTTP referer for all pages, navigations, and requests within that test session, enabling seamless verification of affiliate attribution, partner integrations, and referer-dependent access controls.
