# 248_Test_case1 — Empty Web-Table Case File

**File:** `29_Playwright/e2e_tests/07_WebTables/248_Test_case1.spec.ts`

## Overview
The file is currently empty. It sits in the web-table folder as the first numbered case. The intended topic is locating a cell by known text and reading a sibling column, which 249 implements with dynamic XPath.

---

## Main Concept
Playwright does not execute an empty `.spec.ts`. Until `test()` is defined, this path is a placeholder on disk. Fill it with `test` + `page.goto` + a locator that targets `table#customers` or `#employees-tbody`.

A first table case usually counts rows, skips the header, and asserts one known pair (name → country).

### Code Example

```javascript
import { test, expect } from '@playwright/test';

test('web table case 1 — find country by name', async ({ page }) => {
  await page.goto('https://awesomeqa.com/webtable.html');
  const row = page.locator('#customers tr').filter({ hasText: 'Helen Bennett' });
  await expect(row.locator('td').nth(2)).toHaveText('UK');
});
```

### Key Points

- An empty spec is not a passing test; the runner simply finds no tests in that file.
- Prefer `filter({ hasText })` over string-concatenated XPath for new code.
- Name the test after the table contract, not “Verify the TestCase”.

---

## Common Mistakes

- Leaving the file empty after Go Pikachu publishes the folder.
- Adding `test()` with no `expect`, so CI stays green with zero proof.
- Mixing AwesomeQA `#customers` markup with Testing Academy employee tables.

---

## Summary
**Key Takeaway:** 248 is an empty slot; implement a named-row assertion (as in the example) or delete the file so the runner stays honest.
