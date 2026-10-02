# 252_Test_case5_pagination — Scan Paginated Tables Until a Row Appears

**File:** `29_Playwright/e2e_tests/07_WebTables/252_Test_case5_pagination.spec.ts`

## Overview
Employee data is split across pages. This spec loops: look for “Luca Greco” in `#employees-tbody`, break if the row exists, otherwise click Next until that button is disabled, then throw.

---

## Main Concept
`row.count()` returns immediately. Zero means “not on this page,” not “not in the app.” Pagination needs an explicit `while` because Playwright auto-wait cannot know there is a Next control.

`getByTestId('next-page')` plus `isDisabled()` is the stop condition. After the loop, relative locators `td[data-col="email"]` and `td[data-col="country"]` read the matched row.

### Code Example

```javascript
let name = 'Luca Greco';
let row;
while (true) {
  row = page.locator('#employees-tbody tr').filter({ hasText: name });
  if (await row.count()) break;
  const next = page.getByTestId('next-page');
  if (await next.isDisabled()) throw new Error('Row not found!');
  await next.click();
}
const email = await row.locator('td[data-col="email"]').innerText();
```

### Key Points

- Rebind `row` each iteration; do not reuse a locator that was empty on page 1 without re-filtering (re-creating is safest).
- Throw when Next is disabled so missing names fail the test.
- `data-col` attributes beat positional `td.nth(3)` when columns reorder.

---

## Common Mistakes

- Infinite loop if Next never disables.
- Using `expect(row).toBeVisible()` on page 1, which waits 30s per missing page.
- Not awaiting `next.click()` before counting again.

---

## Summary
**Key Takeaway:** Paginated tables need a search loop: filter current page, then Next, then fail when Next is disabled.
