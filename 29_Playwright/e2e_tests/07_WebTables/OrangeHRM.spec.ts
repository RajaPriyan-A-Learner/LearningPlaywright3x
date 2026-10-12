import { test, expect, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.ORANGE_HRM_URL!;

interface Credentials {
  UserName: string;
  Password: string;
}

type AriaRole = Parameters<Page['getByRole']>[0];

async function GetUserCredentials(page: Page): Promise<Credentials> {
  // Target the specific demo credential paragraphs inside OrangeHRM
  const demoBox = page.locator('.orangehrm-demo-credentials');

  const usernameCredential = await demoBox.locator('p').filter({ hasText: 'Username' }).textContent();
  const passwordCredential = await demoBox.locator('p').filter({ hasText: 'Password' }).textContent();

  // Extract, trim whitespace, and provide a fallback string to satisfy the interface
  const userNameValue = usernameCredential?.split(':').at(-1)?.trim() ?? '';
  const passwordValue = passwordCredential?.split(':').at(-1)?.trim() ?? '';

  return {
    UserName: userNameValue,
    Password: passwordValue,
  };
}


async function ResolveCredentials(page: Page): Promise<Credentials> {
  let USER_NAME = process.env.ORANGE_HRM_USERNAME!
  let PASSWORD = process.env.ORANGE_HRM_PASSWORD!;

  if (USER_NAME && PASSWORD) {
    return {
      UserName: USER_NAME, Password: PASSWORD
    };
  }
  const retrievedFromUI = await GetUserCredentials(page);
  return { UserName: retrievedFromUI.UserName, Password: retrievedFromUI.Password };
}


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
  const nextBtn = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--previous-next').filter({ has: page.locator('.bi-chevron-right') });;
  while (true) {
    await expect(rows.first()).toBeVisible();
    const targetRow = rows.filter({ hasText: firstname }).filter({ hasText: lastname });
    const matches = await targetRow.count();
    if (matches > 0) {
      page.pause();
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
    await nextBtn.click();                                          // await it
    await expect(rows.first()).not.toHaveText(firstRowBefore ?? ''); // web-first, retries
  }


}


async function Loginform(Username: string, Password: string, page: Page) {
  await page.getByRole('textbox', { name: 'Username' }).fill(Username);
  await page.getByRole('textbox', { name: 'Password' }).fill(Password);
  await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue(Username);
  await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue(Password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function AddEmployee(firstname: string, lastname: string, middlename: string, page: Page) {
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  await page.getByRole('link', { name: 'Add Employee' }).hover();
  await page.getByRole('textbox', { name: 'First Name' }).fill(firstname);
  await page.getByPlaceholder('Middle Name').fill(middlename);
  await page.getByPlaceholder('Last Name').fill(lastname);
  await page.locator('.oxd-input').last().clear();
  await page.locator('.oxd-input').last().pressSequentially(String(randomInt(1, 10000)));
  await ClickByButton('button','Save',page);
}

async function ClickByLink(roleType: 'link', nameValue: string, page: Page) {
  await page.getByRole(roleType, { name: nameValue }).click();
}

async function ClickByButton(roleType: 'button', nameValue: string, page: Page)
{
  await page.getByRole(roleType, { name: nameValue }).click();
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;   // inclusive of both ends
}
