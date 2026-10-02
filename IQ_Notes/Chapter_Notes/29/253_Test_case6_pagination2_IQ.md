# 253_Test_case6_pagination2 — Helper Function Returning a Locator

**File:** `29_Playwright/e2e_tests/07_WebTables/253_Test_case6_pagination2.spec.ts`

## Overview
Same Luca Greco pagination as 252, extracted into `findRowByName(page, name): Promise<Locator>`. The test becomes two lines: find the row, then read email and country.

---

## Main Concept
Returning a `Locator` (not inner text) keeps auto-waiting for later child queries. The helper owns the while-loop and the “row not found” error.

Type-only imports: `type Page` for the argument and `type Locator` for the return. Value import of `Locator` fails under `verbatimModuleSyntax`.

### Code Example

```javascript
import { test, type Page, expect, type Locator } from '@playwright/test';

async function findRowByName(page: Page, name: string): Promise<Locator> {
  while (true) {
    const row = page.locator('#employees-tbody tr').filter({ hasText: name });
    if (await row.count()) return row;
    const next = page.getByTestId('next-page');
    if (await next.isDisabled()) throw new Error(`Row not found: ${name}`);
    await next.click();
  }
}

const row = await findRowByName(page, 'Luca Greco');
const email = await row.locator('td[data-col="email"]').innerText();
```

### Code Breakdown: `253_Test_case6_pagination2.spec.ts`

**Line-by-line Explanation:**
*   `Line 3`: Defines an asynchronous helper function `findRowByName` that accepts a `Page` object and a `name` string, returning a `Promise<Locator>`.
*   `Line 4-14`: Encapsulates the same pagination `while (true)` loop logic from Test Case 5.
*   `Line 7`: Instead of just breaking the loop, it explicitly `return row`, passing the resolved `Locator` back to the caller.
*   `Line 17-26`: The main test body. It navigates to the page and calls the helper function (`await findRowByName(page, 'Luca Greco')`).
*   `Line 22-24`: Uses the returned `Locator` to cleanly chain child locators and extract the email and country.

**Why this approach was chosen:**
The coder chose to abstract the complex pagination logic into a reusable helper function. By returning a Playwright `Locator` instead of just primitive strings (like the extracted text), they retain the ability to perform further Playwright actions (like clicking or asserting) on that specific row in the main test flow.

**Alternative Effective Way:**
Passing the `page` object into helper functions is a standard Page Object Model (POM) pattern.
An alternative effective way, specific to Playwright, is to create a custom Fixture instead of a loose helper function:
```typescript
// Define custom fixture
const test = base.extend({
  tableHelper: async ({ page }, use) => {
    await use({
      findRow: async (name) => { /* pagination logic */ }
    });
  }
});

// Use in test
test('Verify row', async ({ tableHelper }) => {
  const row = await tableHelper.findRow('Luca Greco');
});
```
This is more effective for large suites because fixtures are automatically injected and managed by Playwright's execution context, reducing import clutter and manual object passing.

### Key Points

- Helpers that return locators compose better than helpers that return strings.
- Error messages should include the searched name.
- `page: Page` documents the fixture type without importing a runtime value.

---

## Common Mistakes

- Importing `Locator` without `type`.
- Returning `await row.innerText()` and losing the ability to click the checkbox later.
- Forgetting the function is `async` and calling it without `await`.

---

## Summary
**Key Takeaway:** Extract pagination into an async helper that returns `Promise<Locator>` and import `Page`/`Locator` as types only.
