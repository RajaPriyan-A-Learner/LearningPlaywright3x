# 289_Test_Hooks_TC5 — File-Level Mode Configuration & Tag Filtering

**File:** `29_Playwright/e2e_tests/18_Test_hooks/289_Test_Hooks_TC5.spec.ts`

## Overview
This specification demonstrates how to configure execution modes at the file level using `test.describe.configure({ mode: 'serial' })`, and illustrates test categorization via tags (`@p1`, `@smoke`, `@p2`, `@p3`) for selective CLI test runs using the `--grep` flag.

---

## Main Concept
Managing test execution in enterprise CI/CD pipelines requires fine-grained control over which tests run and how they run:
1. **File-Level Mode Configuration:**
   Calling `test.describe.configure({ mode: 'serial' })` or `{ mode: 'parallel' }` sets the execution mode for the surrounding file or block dynamically.
2. **Tag Filtering (`--grep` & `--grep-invert`):**
   Adding tags like `@smoke`, `@regression`, or `@p1` to test titles allows teams to run targeted subsets of tests on demand via CLI:
   `npx playwright test --grep "@smoke"`
   `npx playwright test --grep "@p1"`
   `npx playwright test --grep-invert "@slow"`

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test('TC01 - Login should work', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

test('TC02 - Dashboard should open', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

// Configure remaining tests to run in serial mode:
test.describe.configure({ mode: 'serial' });

test('Priority 1 - Login test', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

test('Priority 2 - Dashboard test', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

test('Priority 3 - Logout test', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

// Tagged tests for selective execution:
test('Login test @p1 @smoke', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

test('Profile test @p2', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

test('Settings test @p3', async ({ page }) => {
  await page.goto('https://app.vwo.com');
});

// Command line usage:
// npx playwright test --grep @p1
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `289_Test_Hooks_TC5.spec.ts`

**Line-by-line Explanation:**
*   `Line 1`: Imports test fixtures.
*   `Line 3-9`: Tests TC01 and TC02 declared before the mode configuration, executing under default runner settings.
*   `Line 12`: `test.describe.configure({ mode: 'serial' })`: Changes the execution mode for subsequent tests in this scope to serial execution.
*   `Line 14-24`: Priority 1, 2, and 3 tests execute sequentially in declared order due to the serial mode configuration.
*   `Line 27-37`: Tests tagged with `@p1 @smoke`, `@p2`, and `@p3` in their titles for targeted test selection.
*   `Line 39`: Documents the CLI command: `npx playwright test --grep @p1`.

**Why this approach was chosen:**
The coder chose `test.describe.configure` to show how execution modes can be declared programmatically within test files rather than relying solely on global config files. Using `@tag` annotations in test titles demonstrates the primary mechanism for organizing smoke and regression suites in CI/CD pipelines.

**Alternative Effective Ways:**
Modern Playwright (v1.42+) supports formal tag syntax directly in the test configuration object:
```typescript
test('Login test', { tag: ['@p1', '@smoke'] }, async ({ page }) => {
  await page.goto('https://app.vwo.com');
});
```
This syntax separates tags from the human-readable test title, preventing title clutter while providing identical `--grep @smoke` CLI filtering support. In `playwright.config.ts`, you can also define dedicated projects filtered by tag:
```typescript
{
  name: 'smoke',
  grep: /@smoke/,
  use: { ...devices['Desktop Chrome'] }
}
```

---

### Key Points
- `test.describe.configure({ mode: 'serial' | 'parallel' | 'default' })` sets execution behavior for the current scope.
- Tags prefixed with `@` in test titles can be selected via `npx playwright test --grep "@tag"`.
- Modern Playwright also supports `{ tag: ['@smoke'] }` directly in the test options object.

---

## Common Mistakes
- Calling `test.describe.configure` inside a `beforeEach` or `test` block; it must be called at the describe or file root scope.
- Using regex-reserved characters in tag names without escaping them when running `--grep`.
- Relying on title tags without documenting the standard tagging conventions for the team.

---

## Summary
**Key Takeaway:** `test.describe.configure` controls execution mode at the file level, while `@tag` annotations enable selective test suite execution via `--grep` in CI/CD pipelines.
