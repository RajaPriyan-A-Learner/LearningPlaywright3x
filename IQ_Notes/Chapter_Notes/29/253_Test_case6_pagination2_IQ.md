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
