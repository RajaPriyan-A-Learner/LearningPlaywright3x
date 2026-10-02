# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07_WebTables\REAL_EXAMPLE.spec.ts >> Verify user can select the row by name
- Location: 29_Playwright\e2e_tests\07_WebTables\REAL_EXAMPLE.spec.ts:9:5

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1  | import { test, expect, type Locator, type Page } from '@playwright/test';
  2  | import dotenv from 'dotenv';
  3  | import path from 'path';
  4  | 
  5  | dotenv.config({path: path.resolve(__dirname, '../../.env')});
  6  | 
  7  | const BASE_URL = process.env.WEBTABLE_URL!;
  8  | 
  9  | test('Verify user can select the row by name', async ({ page }) => {
> 10 |     await page.goto(BASE_URL);
     |                ^ Error: page.goto: url: expected string, got undefined
  11 |     const CheckBox=GetRowByName(page,'Rohan.Mehta');
  12 |     await CheckBox.check();
  13 |     await expect(CheckBox).toBeChecked();
  14 | 
  15 | });
  16 | 
  17 | function GetRowByName(page: Page, Name: string): Locator {
  18 |     return page.locator('#employee-body tr').filter({hasText:Name}).getByRole('checkbox');
  19 | }
  20 | 
```