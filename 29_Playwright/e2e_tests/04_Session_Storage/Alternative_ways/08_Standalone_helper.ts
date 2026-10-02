// helpers/saveSessionStandalone.ts
import { chromium } from '@playwright/test';

export async function saveSession(storagePath = './user-session.json') {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://app.wingify.com/#/login');
    await page.locator('#login-username').fill(process.env.VWO_USER!);
    await page.locator('#login-password').fill(process.env.VWO_PASS!);
    await page.locator('#js-login-btn').click();
    await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

    await context.storageState({ path: storagePath });
  } finally {
    await browser.close();
  }
}