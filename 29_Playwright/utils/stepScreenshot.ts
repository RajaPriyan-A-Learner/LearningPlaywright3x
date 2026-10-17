import type { Page } from '@playwright/test';

/**
 * Takes a named screenshot attached to the current test step.
 * @param page     - Playwright Page object
 * @param index    - Numeric ordering prefix (e.g. 0, 1, 2…)
 * @param stepName - Human-readable label embedded in the filename
 */
export async function shot(page: Page, index: number, stepName: string): Promise<void> {
    const sanitised = stepName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    await page.screenshot({ path: `test-results/screenshots/${index}_${sanitised}.png` });
}
