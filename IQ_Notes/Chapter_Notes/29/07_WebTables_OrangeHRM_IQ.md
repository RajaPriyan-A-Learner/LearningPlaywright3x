# 07_WebTables_OrangeHRM — Full CRUD & Dynamic Table Row Operations

**File:** `29_Playwright/e2e_tests/07_WebTables/OrangeHRM.spec.ts`

## Overview
This specification delivers an end-to-end CRUD workflow against OrangeHRM's Employee Management (PIM) module. It demonstrates dynamic environment variable credential resolution, authentication, adding an employee with random employee IDs, paginating through an enterprise data grid, filtering target rows by composite text matches, and performing row-level deletion with confirmation dialogs.

---

## Main Concept
Enterprise web tables frequently render tabular datasets using custom virtualized `<div>` structures (`oxd-table-body`) rather than native `<table>` elements. Selecting, asserting, and interacting with specific records across multiple pages requires combining:
1. Two-tier row filtering: `rows.filter({ hasText: firstname }).filter({ hasText: lastname })`.
2. Relative locator traversal: Locating action buttons (`.bi-trash`) nested strictly inside the matched row container.
3. Pagination synchronization: Waiting for the previous page's contents to mutate before asserting on the subsequent page (`expect(rows.first()).not.toHaveText(firstRowBefore)`).

### Code Example

```typescript
import { test, expect, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.ORANGE_HRM_URL!;

test('Add a new employee to the PIM and delete it', async ({ page }) => {
  const firstName = 'John';
  const middleName = 'Micheal';
  const lastName = 'Smith';

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 100000 });
  await expect(page.getByAltText('company-branding')).toBeVisible();

  const credentials = await ResolveCredentials(page);
  await Loginform(credentials.UserName, credentials.Password, page);

  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await ClickByLink('link', 'PIM', page);
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');

  await AddEmployee(firstName, lastName, middleName, page);
  await ClickByLink('link', 'PIM', page);
  await DeleteEmployee(firstName, lastName, middleName, page);
});

async function DeleteEmployee(firstname: string, lastname: string, middlename: string, page: Page): Promise<void> {
  const rows = page.locator('.oxd-table-body').getByRole('row');
  const nextBtn = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--previous-next').filter({ has: page.locator('.bi-chevron-right') });
  while (true) {
    await expect(rows.first()).toBeVisible();
    const targetRow = rows.filter({ hasText: firstname }).filter({ hasText: lastname });
    const matches = await targetRow.count();
    if (matches > 0) {
      const deleteIcon = targetRow.first().getByRole('button').filter({ has: page.locator('.bi-trash') });
      await deleteIcon.first().click();
      await expect(page.getByText('Are you Sure?', { exact: true })).toBeVisible();
      await ClickByButton('button', 'Yes, Delete', page);
      break;
    }
    if (!(await nextBtn.isVisible())) {
      throw new Error(`${firstname} ${middlename} ${lastname} not found in the table`);
    }

    const firstRowBefore = await rows.first().textContent();
    await nextBtn.click();
    await expect(rows.first()).not.toHaveText(firstRowBefore ?? '');
  }
}
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `OrangeHRM.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-10`: Imports types and initializes `dotenv` to extract `ORANGE_HRM_URL`. Defines a TypeScript `Credentials` interface for type safety.
*   `Line 14-29`: `GetUserCredentials(page)`: Scrapes on-screen demo credentials as a fallback when environment variables are omitted, splitting string text on `:` and trimming whitespace.
*   `Line 32-43`: `ResolveCredentials(page)`: Prioritizes explicit environment credentials (`process.env.ORANGE_HRM_USERNAME`), falling back to UI extraction dynamically.
*   `Line 46-66`: Test suite executing the workflow: navigates to login, verifies logo, logs in, navigates to PIM, creates an employee, re-opens employee table, and deletes the newly created record.
*   `Line 68-93`: `DeleteEmployee(...)`: Paginates through the table by checking row text. Targets row matches with chained filters (`.filter({ hasText: firstname }).filter({ hasText: lastname })`). If located, clicks the trash icon within that row, verifies modal confirmation text, and clicks 'Yes, Delete'.
*   `Line 87-90`: Pagination barrier: captures `firstRowBefore`, clicks next, and uses `await expect(rows.first()).not.toHaveText(...)` to ensure the table reloaded with new records before scanning again.
*   `Line 96-102`: `Loginform(...)`: Fills form fields and verifies their populated values before submitting.
*   `Line 104-114`: `AddEmployee(...)`: Navigates to creation view, generates a random employee ID with `randomInt(1, 10000)`, fills details, and saves.
*   `Line 116-127`: Modular helpers `ClickByLink`, `ClickByButton`, and pseudo-random integer generator.

**Why this approach was chosen:**
The coder chose chained locator filtering (`targetRow = rows.filter({ hasText: firstname }).filter({ hasText: lastname })`) because both first and last names may appear in disparate columns, and plain string contains might match unrelated rows. The pagination stabilization trick (`expect(rows.first()).not.toHaveText(firstRowBefore)`) is a masterclass in Playwright synchronization—it guarantees the DOM has replaced row 1 with new data from page N+1, preventing false-negative table searches caused by reading the stale page before the AJAX fetch resolves.

**Alternative Effective Ways:**
Instead of procedural helper functions inside the test file, an alternative effective way is to implement the Page Object Model (POM) separating `LoginPage` and `PimEmployeePage`. Furthermore, for test isolation, rather than generating random IDs and relying on manual UI creation before deletion, test fixtures can leverage OrangeHRM's REST API (`page.request.post('/api/v2/pim/employees', ...)`) to seed test records instantly in `beforeEach`, speeding up execution tenfold and isolating the test to pure deletion logic.

---

### Key Points
- Chained `.filter({ hasText: ... })` statements combine as an logical `AND` query on locator sets.
- Nested locators (`targetRow.first().getByRole('button').filter({ has: ... })`) isolate interactions strictly within the row container.
- Modern tables render via AJAX; always wait for state transition between pagination page clicks.

---

## Common Mistakes
- Hardcoding static sleeps (`page.waitForTimeout(3000)`) between pagination clicks instead of asserting DOM mutation.
- Using index-based button locators (`page.locator('.bi-trash').first()`) which can delete an arbitrary, incorrect employee if ordering changes.
- Forgetting to handle modal confirmations ("Are you sure?"), causing lingering backdrop freeze.

---

## Summary
**Key Takeaway:** Enterprise web table automation demands scoped row-level filtering, atomic interaction containment, and web-first mutation assertions to safely paginate, locate, and mutate data.
