# 236 — Test Suite Architecture: test.describe Grouping & CLI Filtering

**File:** `29_Playwright/e2e_tests/02_TestAnnotations/236_Test_Describe.spec.ts`

## Overview
This file explores test suite architecture and organizational patterns in Playwright using `test.describe()`. It covers hierarchical test structuring, scoping lifecycle hooks to specific functional sub-domains, configuring execution modes per describe block (`serial` vs `parallel`), and targeting specific test groups using Playwright's command-line interface `-g` / `--grep` filters.

---

## Main Concept

As automated test suites grow to hundreds of specifications, organizing tests into logical, cohesive groups becomes critical. `test.describe()` creates a namespace that groups related tests, shares setup hooks, and formats test reports with clear hierarchy.

### The Hierarchical Suite Model

```
test.describe('Authentication & Onboarding')
  ├── test.beforeEach(async ({ page }) => { ... })  // Scoped to this group
  ├── test('valid credentials')
  ├── test('invalid password')
  └── test.describe('Multi-Factor Authentication')   // Nested describe block
        ├── test('SMS OTP code entry')
        └── test('Authenticator app TOTP')
```

### TypeScript Code Example

```typescript
import { test, expect } from '@playwright/test';

// Group all login-related scenarios inside a dedicated describe block
test.describe('Login Page', () => {

    test('valid credentials', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/");
    });

    test('invalid password', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/");
    });

    test.fixme('checkout with PayPal', async ({ page }) => {
        // never executes — marked as broken
    });

    test.skip('checkout with Apple Pay', async ({ page }) => {
        // never executes — skipped on this platform
    });
});

// Run commands:
// 1. Run only tests matching "Login Page":
//    npx playwright test -g "Login Page"
//
// 2. Invert filter (run all except "Login Page"):
//    npx playwright test --grep-invert "Login Page"
```

### Key Points
- **Scoped Lifecycle Hooks:** Hooks (`test.beforeEach`, `test.afterEach`) declared inside a `test.describe()` block run exclusively for the tests defined within that block.
- **Suite Modes:**
  - `test.describe.serial()`: Forces tests in the block to run sequentially on the same worker; if one test fails, subsequent tests in the block are immediately skipped.
  - `test.describe.parallel()`: Explicitly enables parallel execution for tests within the block.
- **CLI Grep Capabilities:** The `-g` flag accepts regular expressions, enabling targeted execution like `npx playwright test -g "Login.*credentials"`.

---

## Common Mistakes
- **Creating Giant Monolithic Describe Blocks:** Nesting dozens of unrelated tests inside a single `test.describe` makes test reports hard to navigate and prevents effective parallelization.
- **Leaking State Across Tests in Serial Describe Blocks:** While `describe.serial()` guarantees sequence, tests should still strive to clean up their own state to avoid cascading failures.
- **Using String Concatenation in Grep Filters:** Passing complex strings with special regex characters without escaping them in `-g` can cause unexpected test matching.

---

## Summary
**Key Takeaway:** `test.describe` provides structured modularity for test suites, isolates lifecycle hooks to specific features, and pairs with CLI `--grep` filtering to enable fast, targeted test execution.
