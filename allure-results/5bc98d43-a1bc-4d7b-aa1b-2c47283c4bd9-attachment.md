# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 07_WebTables\OrangeHRM.spec.ts >> Add a new employee to the PIM and delete it
- Location: 29_Playwright\e2e_tests\07_WebTables\OrangeHRM.spec.ts:46:5

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test';
  2   | import dotenv from 'dotenv';
  3   | 
  4   | dotenv.config();
  5   | const BASE_URL = process.env.ORANGE_HRM_URL!;
  6   | 
  7   | interface Credentials {
  8   |   UserName: string;
  9   |   Password: string;
  10  | }
  11  | 
  12  | type AriaRole = Parameters<Page['getByRole']>[0];
  13  | 
  14  | async function GetUserCredentials(page: Page): Promise<Credentials> {
  15  |   // Target the specific demo credential paragraphs inside OrangeHRM
  16  |   const demoBox = page.locator('.orangehrm-demo-credentials');
  17  | 
  18  |   const usernameCredential = await demoBox.locator('p').filter({ hasText: 'Username' }).textContent();
  19  |   const passwordCredential = await demoBox.locator('p').filter({ hasText: 'Password' }).textContent();
  20  | 
  21  |   // Extract, trim whitespace, and provide a fallback string to satisfy the interface
  22  |   const userNameValue = usernameCredential?.split(':').at(-1)?.trim() ?? '';
  23  |   const passwordValue = passwordCredential?.split(':').at(-1)?.trim() ?? '';
  24  | 
  25  |   return {
  26  |     UserName: userNameValue,
  27  |     Password: passwordValue,
  28  |   };
  29  | }
  30  | 
  31  | 
  32  | async function ResolveCredentials(page: Page): Promise<Credentials> {
  33  |   let USER_NAME = process.env.ORANGE_HRM_USERNAME!
  34  |   let PASSWORD = process.env.ORANGE_HRM_PASSWORD!;
  35  | 
  36  |   if (USER_NAME && PASSWORD) {
  37  |     return {
  38  |       UserName: USER_NAME, Password: PASSWORD
  39  |     };
  40  |   }
  41  |   const retrievedFromUI = await GetUserCredentials(page);
  42  |   return { UserName: retrievedFromUI.UserName, Password: retrievedFromUI.Password };
  43  | }
  44  | 
  45  | 
  46  | test('Add a new employee to the PIM and delete it', async ({ page }) => {
  47  | 
  48  |   const firstName = 'John';
  49  |   const middleName = 'Micheal';
  50  |   const lastName = 'Smith';
  51  | 
> 52  |   await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 100000 });
      |              ^ Error: page.goto: url: expected string, got undefined
  53  |   await expect(page.getByAltText('company-branding')).toBeVisible();
  54  | 
  55  |   const credentials = await ResolveCredentials(page);
  56  |   await Loginform(credentials.UserName, credentials.Password, page);
  57  | 
  58  |   await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  59  |   await ClickByLink('link', 'PIM', page);
  60  |   await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
  61  | 
  62  | 
  63  |   await AddEmployee(firstName, lastName, middleName, page);
  64  |   await ClickByLink('link', 'PIM', page);
  65  |   await DeleteEmployee(firstName, lastName, middleName, page);
  66  | });
  67  | 
  68  | async function DeleteEmployee(firstname: string, lastname: string, middlename: string, page: Page): Promise<void> {
  69  |   const rows = page.locator('.oxd-table-body').getByRole('row');
  70  |   const nextBtn = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--previous-next').filter({ has: page.locator('.bi-chevron-right') });;
  71  |   while (true) {
  72  |     await expect(rows.first()).toBeVisible();
  73  |     const targetRow = rows.filter({ hasText: firstname }).filter({ hasText: lastname });
  74  |     const matches = await targetRow.count();
  75  |     if (matches > 0) {
  76  |       page.pause();
  77  |       const deleteIcon = targetRow.first().getByRole('button').filter({ has: page.locator('.bi-trash') });
  78  |       await deleteIcon.first().click();
  79  |       await expect(page.getByText('Are you Sure?', { exact: true })).toBeVisible();
  80  |       await ClickByButton('button', 'Yes, Delete', page);
  81  |       break;
  82  |     }
  83  |     if (!(await nextBtn.isVisible())) {
  84  |       throw new Error(`${firstname} ${middlename} ${lastname} not found in the table`);
  85  |     }
  86  | 
  87  |     const firstRowBefore = await rows.first().textContent();
  88  |     await nextBtn.click();                                          // await it
  89  |     await expect(rows.first()).not.toHaveText(firstRowBefore ?? ''); // web-first, retries
  90  |   }
  91  | 
  92  | 
  93  | }
  94  | 
  95  | 
  96  | async function Loginform(Username: string, Password: string, page: Page) {
  97  |   await page.getByRole('textbox', { name: 'Username' }).fill(Username);
  98  |   await page.getByRole('textbox', { name: 'Password' }).fill(Password);
  99  |   await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue(Username);
  100 |   await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue(Password);
  101 |   await page.getByRole('button', { name: 'Login' }).click();
  102 | }
  103 | 
  104 | async function AddEmployee(firstname: string, lastname: string, middlename: string, page: Page) {
  105 |   await page.getByRole('button', { name: 'Add' }).click();
  106 |   await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  107 |   await page.getByRole('link', { name: 'Add Employee' }).hover();
  108 |   await page.getByRole('textbox', { name: 'First Name' }).fill(firstname);
  109 |   await page.getByPlaceholder('Middle Name').fill(middlename);
  110 |   await page.getByPlaceholder('Last Name').fill(lastname);
  111 |   await page.locator('.oxd-input').last().clear();
  112 |   await page.locator('.oxd-input').last().pressSequentially(String(randomInt(1, 10000)));
  113 |   await ClickByButton('button','Save',page);
  114 | }
  115 | 
  116 | async function ClickByLink(roleType: 'link', nameValue: string, page: Page) {
  117 |   await page.getByRole(roleType, { name: nameValue }).click();
  118 | }
  119 | 
  120 | async function ClickByButton(roleType: 'button', nameValue: string, page: Page)
  121 | {
  122 |   await page.getByRole(roleType, { name: nameValue }).click();
  123 | }
  124 | 
  125 | function randomInt(min: number, max: number): number {
  126 |   return Math.floor(Math.random() * (max - min + 1)) + min;   // inclusive of both ends
  127 | }
  128 | 
```