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