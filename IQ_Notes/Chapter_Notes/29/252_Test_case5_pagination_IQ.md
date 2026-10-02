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

### Code Breakdown: `252_Test_case5_pagination.spec.ts`

**Line-by-line Explanation:**
*   `Line 8`: Initializes an infinite `while (true)` loop to scan pages sequentially.
*   `Line 9`: Looks for a row containing the name 'Luca Greco' using the `.filter({ hasText: ... })` method.
*   `Line 10-12`: Evaluates `row.count()`. If the element is found on the current page (count > 0), the loop immediately breaks.
*   `Line 13-17`: If the row is not found, it locates the 'Next' pagination button. It checks if the button is disabled (meaning it reached the last page) and throws an error if true. Otherwise, it clicks 'Next' to load the next page and loops again.
*   `Line 20-24`: Once the loop breaks (the row was found), it uses scoped locators (`data-col`) to extract the email and country cells from that specific row and prints them.

**Why this approach was chosen:**
The coder chose this `while` loop pattern because Playwright's auto-waiting mechanisms only work on the current DOM state. Playwright cannot inherently know it needs to click "Next Page" to find an element. This explicit loop manually controls the pagination state machine, proving how to handle datasets larger than a single view.

**Alternative Effective Way:**
While the `while (true)` loop works, if the 'Next' button's `disabled` state isn't perfectly synchronized with the DOM update, it might throw a false positive or click too early.
An alternative effective way is to rely on API interception rather than UI pagination if the goal is purely data validation:
```typescript
const response = await page.waitForResponse('**/api/employees?page=*');
const data = await response.json();
const user = data.employees.find(e => e.name === 'Luca Greco');
```
If UI testing is strictly required, the loop is correct, but the click (`await next.click()`) should ideally be paired with an assertion that the table content actually changed before the next iteration begins, avoiding race conditions.

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
