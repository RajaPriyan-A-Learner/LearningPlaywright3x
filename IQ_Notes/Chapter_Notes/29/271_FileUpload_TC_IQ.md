# 271_FileUpload_TC — Single File Upload with setInputFiles

**File:** `29_Playwright/e2e_tests/14_FileUpload/271_FileUpload_TC.spec.ts`

## Overview
This specification demonstrates the foundational mechanism for uploading files in Playwright using `locator.setInputFiles()`. It points to Heroku's file upload demo, creates an absolute file path using Node's `path.join(__dirname, ...)`, sets the file onto the `<input type="file">` element without opening the operating system's native file dialog, submits the form, and asserts successful upload.

---

## Main Concept
Traditional browser automation struggled with native OS file dialog boxes because web drivers cannot interact with Windows Explorer or macOS Finder dialog windows.
**Playwright bypasses operating system dialogs completely** by interacting directly with the underlying HTML `<input type="file">` DOM node using `setInputFiles()`. This injects file buffers and metadata directly into the browser process via CDP/Bidi protocols, ensuring 100% headless reliability across all operating systems.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://the-internet.herokuapp.com/upload';

test.describe('FileUpload handling', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(URL, { waitUntil: 'domcontentloaded' });
   });

   test('locate FileUpload and upload', async ({ page }) => {
      const filePath = path.join(__dirname, 'testdata.txt');
      await page.locator("#file-upload").setInputFiles([filePath]);
      await page.getByRole("button", { name: "Upload" }).click();
      await expect(page.locator('#uploaded-files')).toContainText('testdata.txt');
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `271_FileUpload_TC.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-2`: Imports Playwright fixtures and Node's built-in `path` module for cross-platform filesystem path resolution.
*   `Line 4-10`: Sets the Heroku upload URL and prepares the page in `beforeEach` with `{ waitUntil: 'domcontentloaded' }`.
*   `Line 16`: Resolves the absolute path to `testdata.txt` relative to the current test file directory using `path.join(__dirname, 'testdata.txt')`.
*   `Line 19`: Targets the `<input type="file" id="file-upload">` locator and invokes `.setInputFiles([filePath])`, attaching the file.
*   `Line 20`: Submits the upload form via `page.getByRole("button", { name: "Upload" }).click()`.
*   `Line 21`: Validates that the uploaded files confirmation container `#uploaded-files` contains the filename `testdata.txt`.

**Why this approach was chosen:**
The coder chose `path.join(__dirname, 'testdata.txt')` because relative strings like `'./testdata.txt'` evaluate relative to Node's working directory (`process.cwd()`), which varies depending on whether tests are executed from the repo root, a package script, or an IDE extension. `__dirname` guarantees consistent path resolution regardless of invocation context.

**Alternative Effective Ways:**
While `locator.setInputFiles()` is ideal for direct file inputs, some modern websites do not expose `<input type="file">` in the initial DOM until a button is clicked, or they handle uploads via dropzones that trigger a `filechooser` event. In such cases, an alternative effective way is to use `page.waitForEvent('filechooser')`:
```typescript
const fileChooserPromise = page.waitForEvent('filechooser');
await page.getByRole('button', { name: 'Select file' }).click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(filePath);
```
This intercepts the native file chooser dialog safely and attaches the desired files.

---

### Key Points
- `locator.setInputFiles()` works on `<input type="file">` elements without triggering the native OS dialog.
- Always use `path.join(__dirname, ...)` to ensure cross-platform execution on Windows, Linux, and macOS.
- To clear an existing file input, call `await locator.setInputFiles([])`.

---

## Common Mistakes
- Clicking the `<input type="file">` button with `.click()` before calling `setInputFiles()`, which can freeze test execution by waiting for an OS dialog.
- Using hardcoded Windows backslash paths (e.g., `C:\\Users\\...`), which breaks in Linux CI environments.
- Passing a non-existent file path, which throws an immediate ENOENT exception from Node or Playwright.

---

## Summary
**Key Takeaway:** `setInputFiles()` provides a robust, cross-platform method to automate file uploads directly on DOM inputs without interacting with operating system dialogs.
