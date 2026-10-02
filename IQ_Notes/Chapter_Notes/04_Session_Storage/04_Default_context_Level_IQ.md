## Overview
Demonstrates creating multiple isolated browser contexts inside a single test to simulate different users interacting simultaneously.

## Main Concept
Using the raw `browser` fixture to manually spin up multiple `browser.newContext()` instances, injecting different `storageState` files into each.

```typescript
import { test, expect, type Browser } from '@playwright/test';

test('Manager approves Employee request', async ({ browser }: { browser: Browser }) => {
    // Context 1: Employee
    const employeeContext = await browser.newContext({
        storageState: './playwright/.auth/employee.json'
    });
    const employeePage = await employeeContext.newPage();
    await employeePage.goto('/requests/new');
    await employeePage.getByRole('button', { name: 'Submit' }).click();

    // Context 2: Manager (same browser instance, different isolated auth)
    const managerContext = await browser.newContext({
        storageState: './playwright/.auth/manager.json'
    });
    const managerPage = await managerContext.newPage();
    await managerPage.goto('/admin/approvals');
    await expect(managerPage.getByText('New Request')).toBeVisible();

    await employeeContext.close();
    await managerContext.close();
});
```

## Optimized Pattern (Using `try...finally`)
Using a `try...finally` block is a highly recommended practice when manually managing contexts. It guarantees that the contexts are closed even if an assertion (like `expect`) fails midway through the test, preventing background resource leakage.

```typescript
import { test, expect, type Browser } from '@playwright/test';

test('Manager approves Employee request', async ({ browser }: { browser: Browser }) => {
    // 1. Initialize contexts outside the try block so they are accessible in finally
    const employeeContext = await browser.newContext({
        storageState: './playwright/.auth/employee.json'
    });
    const managerContext = await browser.newContext({
        storageState: './playwright/.auth/manager.json'
    });

    try {
        const employeePage = await employeeContext.newPage();
        await employeePage.goto('/requests/new');
        await employeePage.getByRole('button', { name: 'Submit' }).click();

        const managerPage = await managerContext.newPage();
        await managerPage.goto('/admin/approvals');
        await expect(managerPage.getByText('New Request')).toBeVisible();
    } finally {
        // 2. Guaranteed to close contexts even on failure
        await employeeContext.close();
        await managerContext.close();
    }
});
```

## Line-by-Line Code Breakdown & Coder Rationale
- `async ({ browser }: { browser: Browser }) => {`: 
  - **Why the Coder Chose This:** Instead of using the default `page` or `context` fixtures, the coder uses the raw `browser` fixture. This allows the creation of multiple distinct, completely isolated incognito-like contexts.
- `const employeeContext = await browser.newContext({ storageState: ... });`:
  - **Why the Coder Chose This:** Manually spins up the first context, injecting the employee's auth state.
- `const managerContext = await browser.newContext({ storageState: ... });`:
  - **Why the Coder Chose This:** Spins up a second, isolated context injecting the manager's auth state. This is critical for testing multi-user workflows (like chat apps or approval chains) in real-time within a single test.
  - **Effective Alternative Ways:** This pattern is robust but verbose. An alternative is abstracting this logic into custom fixtures (e.g., `test('flow', async ({ employeePage, managerPage }) => {...})`) to clean up the test body.
- `await employeeContext.close(); await managerContext.close();`: 
  - **Why the Coder Chose This:** Manually closing contexts prevents memory leaks since we bypassed the default fixtures which auto-close.

## Common Mistakes
- **Mixing up pages**: Accidentally using `employeePage` when meaning to assert on `managerPage`.
- **Forgetting to close contexts**: Leading to resource leakage.

## Summary
Manual context creation is the key to multi-role, real-time interaction testing within a single spec.
