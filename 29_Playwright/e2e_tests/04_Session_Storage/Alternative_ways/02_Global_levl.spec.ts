// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://app.wingify.com',
    storageState: './playwright/.auth/user.json', // All specs inherit this state
  },
});