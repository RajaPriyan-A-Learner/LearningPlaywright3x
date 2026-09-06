# 218 — Browser Selection and Exhaustive Dispatch in Playwright

**File:** `26_chapter_Abstractions/02_chapter_ENUM/218_REAL_Browser_PW.ts`

## Overview
This file demonstrates **Browser Selection and Switch Dispatch** in Playwright test automation using a `Browser` enum (`Chrome`, `Firefox`, `Safari`, `Edge`). It shows how enums integrate with `switch` statements to orchestrate cross-browser test runner launches.

---

## Main Concept

Playwright supports multiple browser engines: Chromium (Chrome, Edge), Gecko (Firefox), and WebKit (Safari). Using an enum restricts browser choices to supported targets and enables clean, exhaustive control flow.

### Browser Enum and Launcher
```typescript
enum Browser {
    Chrome = "chrome",
    Firefox = "firefox",
    Safari = "safari",
    Edge = "edge"
}
```

### Code Example

```typescript
enum Browser {
    Chrome = "chrome",
    Firefox = "firefox",
    Safari = "safari",
    Edge = "edge"
}

function launchBrowser(browser: Browser): void {
    switch (browser) {
        case Browser.Chrome:
            console.log("Launching Chromium (Chrome v120)");
            break;
        case Browser.Firefox:
            console.log("Launching Gecko (Firefox v115)");
            break;
        case Browser.Safari:
            console.log("Launching WebKit (Safari v17)");
            break;
        case Browser.Edge:
            console.log("Launching Chromium (Edge v120)");
            break;
    }
}

launchBrowser(Browser.Chrome);
```

### Key Points
- **Exhaustive Matching:** Pairing enums with `switch` ensures every browser target is explicitly handled. (Adding a `default: const _exhaustive: never = browser;` guarantees compile-time exhaustiveness checking).
- **Driver Mapping:** Directly maps high-level browser names to Playwright's core launcher methods (`chromium.launch()`, `firefox.launch()`, `webkit.launch()`).
- **Matrix Testing:** Test matrices in CI/CD pipelines can iterate over `Object.values(Browser)` to run identical suites across all supported browsers.

---

## Common Mistakes
- **Omitting `break` in switch statements:** In JavaScript/TypeScript `switch` statements, missing `break` leads to unintentional fallthrough into the next browser case.
- **Using string literals instead of enums:** Passing `"opera"` or `"internet-explorer"` compiles fine with raw strings, but fails immediately if typed with `Browser`.

---

## Summary
**Key Takeaway:** The `Browser` enum restricts and standardizes target browser choices, driving type-safe cross-browser execution dispatch in Playwright test suites.
