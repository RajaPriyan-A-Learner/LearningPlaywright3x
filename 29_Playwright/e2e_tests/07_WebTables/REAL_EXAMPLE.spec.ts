import { test, expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '../../.env')});

const BASE_URL = process.env.WEBTABLE_URL!;

test('Verify user can select the row by name', async ({ page }) => {
    await page.goto(BASE_URL);
    const CheckBox=GetRowByName(page,'Rohan.Mehta');
    await CheckBox.check();
    await expect(CheckBox).toBeChecked();

});

function GetRowByName(page: Page, Name: string): Locator {
    return page.locator('#employee-body tr').filter({hasText:Name}).getByRole('checkbox');
}
