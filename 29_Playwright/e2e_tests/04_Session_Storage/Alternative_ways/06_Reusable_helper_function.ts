// helpers/authHelper.ts
import { type Page, type BrowserContext } from '@playwright/test';

interface SaveSessionOptions {
  storagePath?: string;
  username?: string;
  password?: string;
}

export async function loginAndSaveSession(
  page: Page,
  context: BrowserContext,
  options: SaveSessionOptions = {}
) {
  const user = options.username || process.env.VWO_USER;
  const pass = options.password || process.env.VWO_PASS;
  const storagePath = options.storagePath || './user-session.json';

  if (!user || !pass) {
    throw new Error('VWO_USER / VWO_PASS missing. Configure .env file.');
  }

  await page.goto('https://app.wingify.com/#/login');
  await page.locator('#login-username').fill(user);
  await page.locator('#login-password').fill(pass);
  await page.locator('#js-login-btn').click();

  // Wait until navigation confirms successful authentication
  await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });

  // Save authenticated cookies and storage into target path
  await context.storageState({ path: storagePath });
  console.log(`Session state successfully saved to ${storagePath} ✅`);
}