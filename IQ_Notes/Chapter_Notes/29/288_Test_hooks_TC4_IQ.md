# 288_Test_hooks_TC4 — Serial Mode & Execution Ordering

**File:** `29_Playwright/e2e_tests/18_Test_hooks/288_Test_hooks_TC4.spec.ts`

## Overview
This specification demonstrates how to enforce sequential test execution using `test.describe.serial()`. It illustrates grouping ordered steps (landing, search, add to cart, checkout) into an interdependent serial workflow, while allowing standalone tests in the same file to run in parallel.

---

## Main Concept
By default, Playwright executes tests in parallel across worker processes. However, certain legacy systems or linear business flows (such as order processing where Step 2 requires the order ID created in Step 1) require strict execution order.
**`test.describe.serial()`**:
1. Enforces that tests inside the describe block run sequentially in the same worker process in order of declaration.
2. Implements **fail-fast cancellation**: If any test in the serial block fails, all subsequent tests in that group are automatically skipped, preventing wasted time on doomed downstream steps.
3. Tests defined outside the serial block continue running in parallel independently.

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe.serial('Checkout suite — must run in order', () => {
    test('open landing', async () => { console.log('1'); });
    test('search product', async () => { console.log('2'); });
    test('add to cart', async () => { console.log('3'); });
    test('go to checkout', async () => { console.log('4'); });
});

// These two run in parallel — independent of the serial suite above.
test('standalone A', async () => { console.log('A'); });
test('standalone B', async () => { console.log('B'); });
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `288_Test_hooks_TC4.spec.ts`

**Line-by-line Explanation:**
*   `Line 1`: Imports core Playwright test fixtures.
*   `Line 3-8`: Declares `test.describe.serial(...)` with four sequentially dependent tests simulating an e-commerce checkout flow. If 'search product' fails, 'add to cart' and 'go to checkout' are skipped automatically.
*   `Line 12-13`: Two standalone tests placed outside the serial group that run independently and concurrently.

**Why this approach was chosen:**
The coder chose `test.describe.serial` to demonstrate how to handle workflows where tests depend on state produced by previous steps, without sacrificing parallelism for independent tests in the remainder of the suite.

**Alternative Effective Ways:**
While `serial` mode is sometimes necessary, best practice in modern test automation is to strive for complete test independence:
- Instead of splitting a single interdependent flow across four small `test` blocks in serial mode, combine the entire flow into a single test that uses `test.step()`:
```typescript
test('Complete Checkout Flow', async ({ page }) => {
  await test.step('1. Open landing', async () => { ... });
  await test.step('2. Search product', async () => { ... });
  await test.step('3. Add to cart', async () => { ... });
  await test.step('4. Go to checkout', async () => { ... });
});
```
This avoids shared mutable state between tests, keeps tests fully parallelizable, and provides the same clear step-by-step reporting in the HTML report.

---

### Key Points
- `test.describe.serial()` runs tests sequentially within a single worker.
- If a test in a serial suite fails, subsequent tests in the suite are automatically skipped.
- Tests outside the serial block run independently in parallel.

---

## Common Mistakes
- Relying on `test.describe.serial` across an entire repository, which negates the speed benefits of parallel execution.
- Sharing mutable global variables between serial tests without resetting them in `beforeAll` on retries.
- Using serial mode as a workaround for flakiness instead of fixing locator stability or synchronization issues.

---

## Summary
**Key Takeaway:** `test.describe.serial()` guarantees ordered execution and early-exit skip behavior for interdependent test sequences, while keeping unrelated tests parallel.
