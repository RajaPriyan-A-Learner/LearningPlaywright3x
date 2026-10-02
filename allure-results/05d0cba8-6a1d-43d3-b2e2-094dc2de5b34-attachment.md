# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03_Locator_Commands\REAL_EXAMPLE2.spec.ts >> User validate the Login page URL is not updated if enters invalid credentials
- Location: 29_Playwright\e2e_tests\03_Locator_Commands\REAL_EXAMPLE2.spec.ts:10:5

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import dotenv from 'dotenv';
  3  | 
  4  | 
  5  | dotenv.config();
  6  | const USER_NAME = process.env.User_name!;
  7  | const PASS_WORD = process.env.Password!;
  8  | const BASE_URL = process.env.URL!;
  9  | 
  10 | test('User validate the Login page URL is not updated if enters invalid credentials', async ({ page }) => {
> 11 | 	await page.goto(BASE_URL);
     |             ^ Error: page.goto: url: expected string, got undefined
  12 | 	await expect(page).toHaveURL(BASE_URL);
  13 | 	await page.getByRole('textbox', { name: 'Email' }).fill(USER_NAME);
  14 | 	await page.getByRole('textbox', { name: 'Password' }).fill(PASS_WORD);
  15 | 	const CheckBox = page.getByRole('checkbox', { name: 'Remember me' });
  16 | 	await CheckBox.check();
  17 | 	await expect(CheckBox).toBeChecked({ checked: true });
  18 | 
  19 | 	await page.getByText('Login to Practice Account').click();
  20 | 
  21 | 	//Way 1:
  22 | 	const ENCODED_USER_NAME = encodeURIComponent(USER_NAME);
  23 | 	const ENCODED_PASS_WORD = encodeURIComponent(PASS_WORD);
  24 | 	await expect(page).toHaveURL(`${BASE_URL}?email=${ENCODED_USER_NAME}&password=${ENCODED_PASS_WORD}&remember=yes#login-success`);
  25 | 
  26 | 	//Way 2:
  27 | 	const expectedURL = new URL(BASE_URL);
  28 | 	expectedURL.searchParams.set('email', USER_NAME);
  29 | 	expectedURL.searchParams.set('password', PASS_WORD);
  30 | 	expectedURL.searchParams.set('remember', 'yes');
  31 | 	expectedURL.hash = 'login-success';
  32 | 	await expect(page).toHaveURL(expectedURL.toString());
  33 | 
  34 | 	//Way 3:
  35 | 	// Matches either '@' or '%40'
  36 | 	await expect(page).toHaveURL(/email=dummy(@|%40)yopmail\.com.*#login-success/);
  37 | 
  38 | 	//Way 4:
  39 | 	await expect.poll(() => decodeURIComponent(page.url())).toBe(
  40 | 		`${BASE_URL}?email=${USER_NAME}&password=${PASS_WORD}&remember=yes#login-success`
  41 | 	);
  42 | 
  43 | 	await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  44 | 	//await page.pause();
  45 | 
  46 | }
  47 | );
```