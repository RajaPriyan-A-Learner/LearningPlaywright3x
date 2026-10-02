## Overview
Demonstrates building custom Playwright fixtures to abstract away authentication context creation.

## Main Concept
Extending the base `test` object to provide pre-authenticated `page` fixtures (like `adminPage` and `userPage`) directly into the test arguments.

```typescript
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
```

## Line-by-Line Code Breakdown & Coder Rationale
- `import { test as base, type Page} from '@playwright/test'`: Aliases `test` to `base` to allow extending it.
- `type AuthRole = { adminPage: Page; userPage: Page; };`: Types the new fixtures.
- `export const test = base.extend<AuthRole>({`: 
  - **Why the Coder Chose This:** Extends Playwright's base test runner to inject custom logic. This is the ultimate pattern for DRY (Don't Repeat Yourself) testing in Playwright.
- `adminPage: async ({ browser }, use) => { ... await use(page); ... }`:
  - **Why the Coder Chose This:** The fixture receives the raw `browser`, creates a context using the `admin.json` state, creates a page, and passes it to the test via `await use(page)`. Once the test completes, it safely closes the context.
  - **Effective Alternative Ways:** This is an abstraction over the manual context creation seen in alternative #4. It is far superior for readability and maintainability. An alternative is the global `projects` config, but fixtures allow mixing and matching multiple users in the *same* test block (`test('flow', async ({ adminPage, userPage }) => {...})`).

## Common Mistakes
- **Forgetting `await use(page)`**: The test will hang forever.
- **Importing the wrong `test`**: In the spec file, you must import `test` from `./fixtures.ts`, not from `@playwright/test`, otherwise the custom fixtures won't be recognized.

## Summary
Custom fixtures encapsulate authentication logic beautifully, providing clean, readable spec files that inject pre-authenticated pages on demand.
