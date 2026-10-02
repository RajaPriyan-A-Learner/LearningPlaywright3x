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

### Code Breakdown: `249_Test_case2.spec.ts`

**Line-by-line Explanation:**
*   `Line 12-14`: Defines strings to construct dynamic XPath queries (`//table[@id='customers']/tbody/tr[`, `]/td[`, `]`).
*   `Line 16-17`: Counts the total number of rows and columns in the target table.
*   `Line 19-38`: Sets up a nested `for` loop (rows, then columns) to iterate through every single cell in the table grid.
*   `Line 23-25`: Concatenates the current row (`i`) and column (`j`) indexes to build a dynamic XPath string, and extracts the `innerText()` of that specific cell.
*   `Line 28-33`: Checks if the current cell contains the text "Helen Bennett". If true, it builds a *new* XPath using `following-sibling::td` to grab the adjacent cell's text (the country) and logs it.

**Why this approach was chosen:**
The coder chose this nested loop and dynamic XPath approach to manually replicate how older Selenium WebDriver scripts traverse tables. By manually iterating through the 2D matrix, it guarantees every cell is checked, demonstrating how to bridge legacy automation paradigms into Playwright.

**Alternative Effective Way:**
This nested iteration approach is extremely slow in Playwright because it forces an asynchronous round-trip to the browser for every single cell just to read text.
An alternative effective way is to use Playwright's declarative locators to pinpoint the exact row without any looping:
```typescript
const targetRow = page.locator("#customers tr").filter({ hasText: 'Helen Bennett' });
const country = await targetRow.locator('td').nth(2).innerText(); // 0-based index
```
This is significantly more effective as Playwright resolves the filtering internally in a single command, making the test far faster and removing brittle string concatenation.

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
