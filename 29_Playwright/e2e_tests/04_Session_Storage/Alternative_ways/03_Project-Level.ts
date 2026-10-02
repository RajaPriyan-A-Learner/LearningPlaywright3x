// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // 1. Setup project — runs auth once before tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    // 2. Standard User Project
    {
      name: 'chromium-user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    // 3. Admin User Project
    {
      name: 'chromium-admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/admin.json',
      },
      dependencies: ['setup'],
    },
    // 4. Logged-Out / Public Specs
    {
      name: 'logged-out',
      testMatch: /.*\.logged-out\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});