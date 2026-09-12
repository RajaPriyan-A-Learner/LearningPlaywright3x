import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('rajapriyan.krishnaswamy@gmail.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Enter');
  await page.getByRole('textbox', { name: 'Enter verification code' }).fill('840052');
  await page.getByRole('button', { name: 'Dismiss' }).click();
  await page.getByRole('link', { name: 'Playwright Enrolled' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('tab', { name: 'Programs' }).click();
  await page.getByRole('tab', { name: 'Projects' }).click();
  await page.getByRole('tab', { name: 'Practice' }).click();
  await page.getByRole('tab', { name: 'Interview' }).click();
  await page.getByRole('tab', { name: 'Cheat Sheet' }).click();
  await page.getByRole('tab', { name: 'AI Tools' }).click();
  await page.getByRole('tab', { name: 'Articles' }).click();
  await page.getByRole('tab', { name: 'Certification' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});