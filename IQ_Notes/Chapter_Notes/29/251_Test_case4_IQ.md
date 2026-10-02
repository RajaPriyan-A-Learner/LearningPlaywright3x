# 251_Test_case4 — CSS :has() to Click a Row Checkbox

**File:** `29_Playwright/e2e_tests/07_WebTables/251_Test_case4.spec.ts`

## Overview
This spec selects the employee row for `Rohan.Mehta` on the Testing Academy webtable and clicks that row’s checkbox. It replaces a brittle XPath preceding-sibling with CSS `:has()` and a chained `input`.

---

## Main Concept
`:has(td:text('Rohan.Mehta'))` matches a `tr` that contains a cell with that text. From that row locator, `.locator('input').first()` targets the checkbox without counting columns.

The commented XPath `//td[text()="Rohan.Mehta"]/preceding-sibling::td/input` is the Selenium equivalent: walk to the name cell, then back to the checkbox cell.

### Code Example

```javascript
await page.goto('https://app.thetestingacademy.com/playwright/webtable');

await page
  .locator("tr:has(td:text('Rohan.Mehta'))")
  .locator('input')
  .first()
  .click();
```

### Code Breakdown: `251_Test_case4.spec.ts`

**Line-by-line Explanation:**
*   `Line 4`: Navigates to the webtable page.
*   `Line 6`: Contains a commented-out legacy XPath query (`//td[text()="..."]/preceding-sibling::td/input`), representing the old way of navigating backwards from a cell to a checkbox.
*   `Line 9`: Uses the CSS pseudo-class `:has()` to find a table row (`tr`) that explicitly contains a table cell (`td`) with the exact text 'Rohan.Mehta'.
*   `Line 10-12`: Chaining from that specific row, it locates the descendant `input` element (the checkbox), selects the `.first()` one, and clicks it.
*   `Line 18`: Introduces a hardcoded 5-second sleep for visual observation.

**Why this approach was chosen:**
The coder utilized the CSS `:has()` selector to elegantly avoid complex XPath traversals. Instead of finding the cell and walking "backwards" up the DOM to find the parent row or previous sibling, `:has()` allows the locator to target the parent row directly based on its children's content, making the subsequent search for the `input` much simpler.

**Alternative Effective Way:**
The use of `:has(td:text('...'))` is a proprietary Playwright selector engine feature that works well, but using Playwright's built-in `.filter()` API provides better readability and type safety.
An alternative effective way is:
```typescript
await page.locator('tr')
          .filter({ has: page.getByText('Rohan.Mehta', { exact: true }) })
          .getByRole('checkbox')
          .check();
```
This is more effective because it uses semantic roles (`getByRole('checkbox')`) and native API filtering, which makes the intent clearer than embedding custom pseudo-selectors in string queries.

### Key Points

- `:has()` keeps the row as the primary object; child locators stay relative.
- `.first()` is required if the row contains more than one input.
- `page.waitForTimeout(5000)` is a demo pause, not a wait strategy.

---

## Common Mistakes

- Exact `td:text()` failing when the cell has extra whitespace or nested spans — use `hasText` filter instead.
- Clicking `input` without scoping to the row, which hits the first checkbox in the table.
- Using `waitForTimeout` in CI instead of `expect(checkbox).toBeChecked()`.

---

## Summary
**Key Takeaway:** Treat the table row as the locator root (`tr:has(...)`) then click relative controls; do not chain global XPath across columns.
