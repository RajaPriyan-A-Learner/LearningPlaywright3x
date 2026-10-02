import { test, expect } from '@playwright/test';

// Scoped to this file or describe block
test.use({ storageState: './user-session.json' });

test('Direct Dashboard Navigation', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/dashboard/);
});