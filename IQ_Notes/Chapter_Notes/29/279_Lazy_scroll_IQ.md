# 279_Lazy_scroll — Infinite Scrolling Lists & expect.poll Assertions

**File:** `29_Playwright/e2e_tests/16_Scroll_toElement/279_Lazy_scroll.spec.ts`

## Overview
This specification demonstrates how to automate and assert against lazy-loading lists and infinite scrolling feeds. It scrolls lazy sections into view, establishes initial item counts, triggers dynamic fetch events by scrolling a loading spinner into view, and uses Playwright's `expect.poll()` method to verify that the total item count increases dynamically.

---

## Main Concept
Infinite scroll components (powered by browser `IntersectionObserver` APIs) only fetch subsequent batches of data when a sentinel element (like a spinner or `#lazy-loader`) enters the viewport.
Automating this requires:
1. Waiting for the initial batch to stabilize before counting: `await expect(list).toHaveCount(10)`.
2. Scrolling the sentinel loader element into the viewport to trigger the network request.
3. Using **`expect.poll()`** to repeatedly evaluate the locator count until it exceeds the previous count:
```typescript
await expect.poll(async () => list.count(), {
   message: "expected_items > 10",
   timeout: 10_000
}).toBeGreaterThan(initialCount);
```

### Code Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');
   });

   test('scroll to view', async ({ page }) => {
      await page.getByTestId('section-lazy').scrollIntoViewIfNeeded();
      await page.getByTestId('lazy-list').scrollIntoViewIfNeeded();

      const list = page.getByTestId('lazy-list').locator('li');

      await expect(list).toHaveCount(10);
      const initialCount = await list.count();

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.getByTestId('lazy-loader').scrollIntoViewIfNeeded();

      await expect.poll(async () => list.count(), {
         message: "expected_itmes > 10",
         timeout: 10_000
      }).toBeGreaterThan(initialCount);

      const finalCount = await list.count();
      console.log(finalCount);
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `279_Lazy_scroll.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-8`: Sets up the test suite and opens the scroll widget.
*   `Line 14-17`: Scrolls the lazy section and list into view, and scopes a locator `list` to its child list items (`li`).
*   `Line 21-22`: Crucial barrier: asserts `expect(list).toHaveCount(10)` to ensure the initial two batches have fully rendered before capturing `initialCount`. Reading too early when count is 0 would lead to false positives.
*   `Line 26-27`: Resets the window scroll to top and then brings the `#lazy-loader` element into view, triggering the IntersectionObserver to request the next batch.
*   `Line 30-33`: Uses `expect.poll` with an asynchronous predicate to repeatedly query `list.count()` every 250ms until it exceeds `initialCount` or hits the 10-second timeout.
*   `Line 35-36`: Retrieves and logs the updated item count to the console.

**Why this approach was chosen:**
The coder chose `expect.poll()` because standard Playwright assertions like `toHaveCount(N)` require an exact, predetermined number, whereas infinite scroll feeds often load variable numbers of items (e.g. 5, 10, or 15 items depending on the API payload). `expect.poll(...).toBeGreaterThan(initialCount)` handles dynamic growth smoothly without hardcoding the second batch's exact size.

**Alternative Effective Ways:**
An alternative effective way to automate infinite scroll lists is to intercept the underlying network request:
```typescript
const responsePromise = page.waitForResponse(resp => 
  resp.url().includes('/api/items') && resp.status() === 200
);
await page.getByTestId('lazy-loader').scrollIntoViewIfNeeded();
await responsePromise;
await expect(list).toHaveCount(initialCount + 10);
```
Waiting on the network response gives you direct insight into network completion, allowing an exact count assertion right after the response settles.

---

### Key Points
- `expect.poll(fn, options)` repeatedly runs an arbitrary function until the matcher succeeds.
- Always stabilize the initial list count before triggering subsequent scroll-load cycles.
- Bring the sentinel element (`lazy-loader`) into view to activate `IntersectionObserver` triggers.

---

## Common Mistakes
- Reading `initialCount` before the initial batch renders, causing `count()` to return 0 and leading to flaky assertions.
- Using static timeouts (`page.waitForTimeout(5000)`) instead of `expect.poll()` or network response listeners.
- Scrolling only to the last item when the page layout already fits that item into the viewport, which fails to trigger the threshold observer.

---

## Summary
**Key Takeaway:** `expect.poll()` combined with targeted sentinel scrolling provides a resilient pattern for testing dynamic, infinite-scrolling lists without hardcoding counts.
