import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../../.env')});
const USER_NAME = process.env.User_name!;
const PASS_WORD = process.env.Password!;
const BASE_URL = process.env.URL!;

test('User validate the Login page URL is not updated if enters invalid credentials', async ({ page }) => {
	await page.goto(BASE_URL);
	await expect(page).toHaveURL(BASE_URL);
	await page.getByRole('textbox', { name: 'Email' }).fill(USER_NAME);
	await page.getByRole('textbox', { name: 'Password' }).fill(PASS_WORD);
	const CheckBox = page.getByRole('checkbox', { name: 'Remember me' });
	await CheckBox.check();
	await expect(CheckBox).toBeChecked({ checked: true });

	await page.getByText('Login to Practice Account').click();

	//Way 1:
	const ENCODED_USER_NAME = encodeURIComponent(USER_NAME);
	const ENCODED_PASS_WORD = encodeURIComponent(PASS_WORD);
	await expect(page).toHaveURL(`${BASE_URL}?email=${ENCODED_USER_NAME}&password=${ENCODED_PASS_WORD}&remember=yes#login-success`);

	//Way 2:
	const expectedURL = new URL(BASE_URL);
	expectedURL.searchParams.set('email', USER_NAME);
	expectedURL.searchParams.set('password', PASS_WORD);
	expectedURL.searchParams.set('remember', 'yes');
	expectedURL.hash = 'login-success';
	await expect(page).toHaveURL(expectedURL.toString());

	//Way 3:
	// Matches either '@' or '%40'
	await expect(page).toHaveURL(/email=dummy(@|%40)yopmail\.com.*#login-success/);

	//Way 4:
	await expect.poll(() => decodeURIComponent(page.url())).toBe(
		`${BASE_URL}?email=${USER_NAME}&password=${PASS_WORD}&remember=yes#login-success`
	);

	await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
	//await page.pause();

}
);