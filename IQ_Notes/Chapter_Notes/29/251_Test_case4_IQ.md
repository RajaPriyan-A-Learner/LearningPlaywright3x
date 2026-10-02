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
