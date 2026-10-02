# 249_Test_case2 — Dynamic XPath Row/Column Loops

**File:** `29_Playwright/e2e_tests/07_WebTables/249_Test_case2.spec.ts`

## Overview
This spec walks the AwesomeQA customers table with concatenated XPath. It counts body rows and columns, then nested-loops every cell until it finds “Helen Bennett” and prints the following-sibling country.

---

## Main Concept
Static XPath like `//table[@id='customers']/tbody/tr[5]/td[2]` is brittle. Building `tr[i]/td[j]` from `.count()` lets the loop follow table size. Header row is skipped by starting `i` at 2.

`following-sibling::td` from the matched cell is the classic Selenium-style “same row, next column” move. Playwright locators accept that XPath string unchanged.

### Code Example

```javascript
const firstPart = "//table[@id='customers']/tbody/tr[";
const secondPart = "]/td[";
const rows = await page.locator("//table[@id='customers']/tbody/tr").count();
const cols = await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();

for (let i = 2; i <= rows; i++) {
  for (let j = 1; j <= cols; j++) {
    const dynamicPath = `${firstPart}${i}${secondPart}${j}]`;
    const data = await page.locator(dynamicPath).innerText();
    if (data.includes('Helen Bennett')) {
      const country = await page.locator(`${dynamicPath}/following-sibling::td`).innerText();
      console.log(`Helen Bennett is In - ${country}`);
    }
  }
}
```

### Key Points

- `.count()` does not retry like `expect(locator).toHaveCount()`.
- Nested loops are O(rows × cols); `filter({ hasText })` is usually faster and clearer.
- XPath 1-based indices: `tr[1]` is often the header.

---

## Common Mistakes

- Starting the row loop at 1 and treating header text as a data cell.
- Forgetting `await` on `.innerText()` inside the loop.
- Using `console.log` as the only “assertion” — CI never fails if Helen is missing.

---

## Summary
**Key Takeaway:** Dynamic XPath loops map one-to-one from Selenium table code; prefer `filter` + child `td` locators for new Playwright suites.
