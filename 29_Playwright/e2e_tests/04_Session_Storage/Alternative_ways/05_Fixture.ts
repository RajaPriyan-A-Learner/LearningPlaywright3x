// fixtures.ts
import { test as base, type Page} from '@playwright/test'

type AuthRole = {
  adminPage: Page;
  userPage: Page;
};

export const test = base.extend<AuthRole>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/admin.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

// In spec file:
test('Admin dashboard check', async ({ adminPage }) => {
  await adminPage.goto('/admin');
});