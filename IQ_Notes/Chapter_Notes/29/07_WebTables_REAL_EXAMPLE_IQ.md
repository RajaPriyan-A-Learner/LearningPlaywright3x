# 07_WebTables_REAL_EXAMPLE — Real-World Table Interaction

**File:** `29_Playwright/e2e_tests/07_WebTables/REAL_EXAMPLE.spec.ts`

## Overview
This file demonstrates a real-world scenario of interacting with a web table. It shows how to use Playwright's locator filtering capabilities (`filter({ hasText: ... })`) in combination with `getByRole` to precisely target and interact with an element (a checkbox) inside a specific table row identified by text content. It also utilizes `dotenv` for environment variable management.

## Main Concept
When working with dynamic web tables, elements like checkboxes or action buttons often lack unique IDs. The standard approach is to locate the parent row (`tr`) that contains a unique identifier (like a person's name) and then find the target element within that specific row. Playwright's `filter` method is designed exactly for this use case.

### Code Example
```typescript
import { test, expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '../../.env')});

const BASE_URL = process.env.WEBTABLE_URL!;

test('Verify user can select the row by name', async ({ page }) => {
    await page.goto(BASE_URL);
    const CheckBox=GetRowByName(page,'Rohan.Mehta');
    await CheckBox.check();
    await expect(CheckBox).toBeChecked();

});

function GetRowByName(page: Page, Name: string): Locator {
    return page.locator('#employee-body tr').filter({hasText:Name}).getByRole('checkbox');
}
```

## Line-by-Line Code Breakdown & Coder Rationale

**Line-by-line Explanation:**
*   `Line 1-3`: Imports standard Playwright modules (`test`, `expect`, `Locator`, `Page`), and Node.js modules for environment variables (`dotenv`, `path`).
*   `Line 5-7`: Configures `dotenv` to load environment variables from a `.env` file located two directories up, and assigns the `WEBTABLE_URL` to `BASE_URL`.
*   `Line 9`: Defines the test suite to verify selecting a row by name.
*   `Line 10`: Navigates to the `BASE_URL`.
*   `Line 11`: Calls the helper function `GetRowByName` passing the page and the name 'Rohan.Mehta', storing the returned checkbox locator in `CheckBox`.
*   `Line 12`: Performs the click action to check the checkbox.
*   `Line 13`: Asserts that the checkbox is now correctly checked.
*   `Line 17-19`: A helper function `GetRowByName` that takes the page and a name. It locates all rows (`#employee-body tr`), filters them to only include the row containing the text `Name`, and then finds the checkbox inside that specific row using `getByRole('checkbox')`.

**Why the Coder Chose This:**
The coder chose this structure to make the test highly readable and maintainable. By abstracting the complex locator logic into a separate `GetRowByName` function, the main test body remains concise. Using `.env` for the URL ensures the test isn't hardcoded to a single environment, allowing it to run across different stages (dev, staging, prod). The use of `filter({hasText:Name})` is Playwright's recommended, modern way to handle tables, avoiding complex and brittle XPath expressions.

**Alternative Effective Ways:**
While `dotenv` is used here, Playwright has built-in support for multiple environments via its config file (`playwright.config.ts`). An alternative effective way is to use the `baseURL` property in the Playwright config and define different projects for different environments. This removes the need to manually load `dotenv` and construct the URL in every test file. Also, you could extend Playwright's Page object or use a Page Object Model (POM) to encapsulate `GetRowByName` if this table appears in multiple different test files.

## Common Mistakes
*   Using complex XPath (`//tr[td[contains(text(), 'Rohan.Mehta')]]//input[@type='checkbox']`) instead of Playwright's built-in chained locators and filters, which are more resilient to DOM changes.
*   Not asserting the state after an action (e.g., forgetting `await expect(CheckBox).toBeChecked();`).
*   Hardcoding URLs directly in the test instead of using environment variables.

## Summary
**Key Takeaway:** The `filter({ hasText: ... })` method is the most robust way to interact with specific rows in dynamic web tables. Extracting locator logic into helper functions improves test readability and reusability.
