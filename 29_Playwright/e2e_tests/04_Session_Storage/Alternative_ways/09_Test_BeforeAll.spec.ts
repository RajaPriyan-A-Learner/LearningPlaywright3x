// e2e_tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';
import { saveSession } from './08_Standalone_helper';
import fs from 'fs';

const SESSION_FILE = './user-session.json';

test.describe('Dashboard Tests', () => {
  // Generate session only if missing on disk
  test.beforeAll(async () => {
    if (!fs.existsSync(SESSION_FILE)) {
      await saveSession(SESSION_FILE);
    }
  });

  test.use({ storageState: SESSION_FILE });

  test('Navigate directly to dashboard', async ({ page }) => {
    await page.goto('https://app.wingify.com/#/dashboard');
    await expect(page.locator('.dashboard-header')).toBeVisible();
  });
});