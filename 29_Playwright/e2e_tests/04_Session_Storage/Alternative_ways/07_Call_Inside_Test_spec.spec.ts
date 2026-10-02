import { test, expect } from '@playwright/test';
import { loginAndSaveSession } from './06_Reusable_helper_function';

test.describe('Dynamic / Conditional Auth Suite', () => {

  // Option 1: Call directly inside a setup test
  test('Login and generate session state', async ({ page, context }) => {
    await loginAndSaveSession(page, context, {
      storagePath: './playwright/.auth/custom-user.json'
    });
  });

  // Option 2: Call inside any test step dynamically
  test('Test requiring fresh state capture', async ({ page, context }) => {
    await loginAndSaveSession(page, context, {
      username: 'custom_admin@vwo.com',
      storagePath: './playwright/.auth/admin-user.json'
    });
    await expect(page).toHaveURL(/dashboard/);
  });
});