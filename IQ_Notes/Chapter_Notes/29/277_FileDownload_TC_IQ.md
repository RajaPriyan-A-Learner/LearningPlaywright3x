# 277_FileDownload_TC — Intercepting Browser Downloads with waitForEvent

**File:** `29_Playwright/e2e_tests/15_File_Download/277_FileDownload_TC.spec.ts`

## Overview
This specification demonstrates how to capture, intercept, and persist files downloaded by the browser. It navigates to an upload/download testbed, uses `Promise.all` with `page.waitForEvent('download')` to capture the download event alongside the triggering button click, and persists the payload to disk using `download.saveAs(...)`.

---

## Main Concept
Browser downloads are inherently asynchronous. When a user clicks a "Download" button, the browser might initiate the download immediately or after a slight delay depending on server response headers (`Content-Disposition: attachment`).
If a test clicks the button *first* and then waits for the download, a fast server might finish the download before the event listener is attached, creating a race condition that causes tests to hang.
To prevent this, Playwright uses the **parallel synchronization pattern** via `Promise.all`:
```typescript
const [download] = await Promise.all([
   page.waitForEvent('download'),
   locator.click()
]);
```
This guarantees the listener is active before the triggering action is dispatched.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';

test.describe('File Download Demo - TestingAcademy', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://app.thetestingacademy.com/playwright/widgets/upload-download');
   });

   test('demo: Download setInputFiles', async ({ page }) => {
      const [staticDownload] = await Promise.all([
         page.waitForEvent('download'),
         page.getByTestId('download-static').click()
      ]);

      await staticDownload.saveAs('./out/' + staticDownload.suggestedFilename());
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `277_FileDownload_TC.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-6`: Imports test utilities and establishes the test suite with `beforeEach` navigation to the download widget.
*   `Line 8`: Declares the download test case.
*   `Line 11-14`: Uses `Promise.all` to concurrently register the `page.waitForEvent('download')` promise and perform the click on `page.getByTestId('download-static')`. The resolved `Download` object is destructured into `staticDownload`.
*   `Line 16`: Calls `staticDownload.saveAs(...)` to save the downloaded file to a designated local directory (`./out/`) using the filename suggested by the server via `suggestedFilename()`.

**Why this approach was chosen:**
The coder chose the `Promise.all` idiom because it is the canonical, race-free pattern in Playwright for handling any browser-triggered event (downloads, popups, dialogs, network responses). Using `staticDownload.suggestedFilename()` respects whatever filename the server specified in the `Content-Disposition` header.

**Alternative Effective Ways:**
While `saveAs()` works well for saving files to disk, many automated tests only need to verify the downloaded file's contents (such as verifying CSV columns or checking a PDF's size) without keeping permanent files on disk. An alternative effective way is to read the file stream or buffer directly:
```typescript
const path = await staticDownload.path(); // Temporary file path
expect(staticDownload.suggestedFilename()).toBe('report.csv');

// Or read content directly via stream:
const stream = await staticDownload.createReadStream();
// perform parsing/assertions in memory
```
Additionally, you can assert that the file exists and is non-empty before deleting it as part of test cleanup:
```typescript
import fs from 'fs';
const destination = path.join('./out', staticDownload.suggestedFilename());
await staticDownload.saveAs(destination);
expect(fs.existsSync(destination)).toBe(true);
expect(fs.statSync(destination).size).toBeGreaterThan(0);
fs.unlinkSync(destination); // cleanup
```

---

### Key Points
- Always pair `page.waitForEvent('download')` with the trigger click inside `Promise.all`.
- `download.suggestedFilename()` returns the filename provided by the HTTP server or HTML `download` attribute.
- Playwright automatically deletes temporary download files when the browser context closes, unless explicitly saved via `saveAs()`.

---

## Common Mistakes
- Triggering the click *before* setting up the download event listener, which causes race conditions and timeouts.
- Forgetting to ensure the destination directory (e.g. `./out/`) exists before calling `saveAs()`, which throws an `ENOENT` error.
- Leaving hundreds of downloaded test artifacts accumulating in local folders without automated cleanup.

---

## Summary
**Key Takeaway:** Pairing `page.waitForEvent('download')` with the action click in `Promise.all` provides a reliable, race-free way to intercept and validate downloaded files in Playwright.
