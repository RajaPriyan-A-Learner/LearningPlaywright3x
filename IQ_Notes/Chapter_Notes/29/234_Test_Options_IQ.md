# 234 — BrowserContext Options: Viewport, Geolocation, Locale & Device Emulation

**File:** `29_Playwright/e2e_tests/01_Basics/234_Test_options.spec.ts`

## Overview
This file explores how Playwright configures contextual test environments through `browser.newContext()` options. It covers setting custom desktop viewports, simulating foreign locales (`fr-FR`) and timezones (`Europe/Paris`), overriding geographical coordinates (`geolocation`), granting runtime browser permissions (`permissions: ['geolocation']`), and emulating complete mobile devices (iPhone) including user agent strings, screen scaling factors, and touch capabilities.

---

## Main Concept

Modern web applications behave differently depending on user geography, language preferences, device form factors, and screen sizes. Playwright allows deep environmental emulation at the browser protocol level without needing virtual machines or physical devices.

### Emulation Vectors Configurable per BrowserContext

```
┌────────────────────────────────────────────────────────────┐
│                  BrowserContext Options                    │
├────────────────────────────────────────────────────────────┤
│ • Viewport:          { width: 1920, height: 1080 }         │
│ • Geolocation:       { latitude: 48.8566, longitude: 2.3 } │
│ • Permissions:       ['geolocation', 'notifications']      │
│ • Locale:            'fr-FR' (formats numbers & dates)     │
│ • Timezone:          'Europe/Paris'                        │
│ • Device Profile:    deviceScaleFactor: 2, isMobile, touch │
│ • User-Agent:        Custom mobile/desktop browser UA      │
└────────────────────────────────────────────────────────────┘
```

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

// Test 1: Internationalization, Custom Viewport & Geolocation
test('context with options', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        locale: 'fr-FR',
        timezoneId: 'Europe/Paris',
        geolocation: { latitude: 48.8566, longitude: 2.3522 },
        permissions: ['geolocation'],
    });

    const page = await context.newPage();
    await page.goto('https://app.vwo.com/#login');
    await context.close();
});

// Test 2: Mobile Device Emulation (iPhone viewport, touch, & mobile user agent)
test('mobile context', async ({ browser }) => {
    const iPhone = {
        viewport: { width: 375, height: 667 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
    };

    const context = await browser.newContext(iPhone);
    const page = await context.newPage();
    await page.goto("https://app.vwo.com/#login");
    await context.close();
});
```

### Key Points
- **Protocol-Level Mocking:** Geolocation, timezone, and locale overrides are enforced directly via browser debugging protocols (CDP), meaning `Intl.DateTimeFormat()` and `navigator.geolocation` reflect the configured options instantly.
- **Permissions Bypass:** Passing `permissions: ['geolocation']` auto-grants browser location prompts without human popup interaction.
- **Pre-configured Device Registry:** Playwright also exports `devices` from `@playwright/test`, allowing usage like `const context = await browser.newContext(devices['iPhone 14']);`.

---

## Common Mistakes
- **Setting Geolocation Without Permissions:** Specifying `geolocation: { ... }` without adding `'geolocation'` to `permissions` will trigger an untestable native browser permissions dialogue that blocks execution.
- **Using Device Emulation Instead of Native Real Devices on Safari:** Emulating an iPhone on Chromium mimics user agents, touch events, and dimensions, but still uses Chromium's rendering engine (Blink), not WebKit. For WebKit testing, configure the project with the `webkit` browser type.
- **Forgetting to Close the Context:** Whenever `browser.newContext()` is invoked manually inside a test, always ensure `await context.close()` is called to clean up storage and listeners.

---

## Summary
**Key Takeaway:** Playwright makes device emulation, multi-locale testing, and permission overrides effortless through `browser.newContext()` options, enabling comprehensive international and mobile testing inside standard CI pipelines.
