# 274_FileUpload_TC4 — Multi-File Upload from Disk with Assertions

**File:** `29_Playwright/e2e_tests/14_FileUpload/274_FileUpload_TC4.spec.ts`

## Overview
This specification demonstrates multi-file upload using actual disk files located alongside the test specification. It uses `path.join(__dirname, ...)` to resolve paths for `file1.jpg` and `file2.jpg`, passes them as an array to PatternFly's multiple file upload dropzone, and verifies that the dropzone renders the uploaded filenames in the UI.

---

## Main Concept
When an `<input type="file">` includes the `multiple` attribute, Playwright can attach several files simultaneously by passing an array of filesystem paths to `setInputFiles([file1, file2])`. This simulates a user selecting multiple files at once in the native file selection dialog.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/';

test.describe('FileUpload handling', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('upload multiple files from disk', async ({ page }) => {
      const file1 = path.join(__dirname, 'file1.jpg');
      const file2 = path.join(__dirname, 'file2.jpg');

      await page.locator("div.pf-v6-c-multiple-file-upload input")
         .setInputFiles([file1, file2]);

      const uploadArea = page.locator('div.pf-v6-c-multiple-file-upload');
      await expect(uploadArea).toContainText('file1.jpg');
      await expect(uploadArea).toContainText('file2.jpg');
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `274_FileUpload_TC4.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-4`: Standard test imports and initialization of the target URL.
*   `Line 6-10`: Groups tests under `FileUpload handling` with `beforeEach` navigation.
*   `Line 17-20`: Resolves absolute filesystem paths for two disk files (`file1.jpg`, `file2.jpg`) co-located in the same directory using `__dirname`.
*   `Line 22-23`: Passes both file paths as an array into `setInputFiles([file1, file2])` targeting the nested file input.
*   `Line 26-28`: Asserts that both filenames appear within the rendered UI container using web-first retrying assertion `toContainText`.

**Why this approach was chosen:**
The coder chose real disk files to test the complete lifecycle: reading files from the filesystem, validating binary data transfer through the browser engine, and confirming UI state updates. Using `__dirname` guarantees that paths resolve properly regardless of where the test runner is executed from.

**Alternative Effective Ways:**
An alternative effective way to structure test fixtures across large suites is to maintain a centralized test assets directory (e.g. `tests/fixtures/`) and define a custom fixture in Playwright:
```typescript
import { test as base } from '@playwright/test';
const test = base.extend<{ sampleImages: string[] }>({
  sampleImages: async ({}, use) => {
    await use([
      path.resolve(__dirname, '../../fixtures/file1.jpg'),
      path.resolve(__dirname, '../../fixtures/file2.jpg')
    ]);
  }
});
```
This avoids duplicating asset files across multiple test folders while keeping test specs clean.

---

### Key Points
- Pass an array of paths `[pathA, pathB]` to upload multiple files in a single call.
- The target `<input>` element must support the HTML `multiple` attribute to accept multiple files.
- Always verify both uploaded filenames using web-first `toContainText` assertions.

---

## Common Mistakes
- Calling `setInputFiles` twice sequentially with individual files, which replaces the first file instead of adding both (unless the web application specifically handles successive single-file appends via custom JavaScript).
- Providing relative paths without `__dirname`, causing failures when tests run from varying root directories.
- Assuming files are uploaded before the UI confirms them; always assert on the UI feedback container.

---

## Summary
**Key Takeaway:** Uploading multiple disk files at once is cleanly achieved by passing an array of paths into `locator.setInputFiles([file1, file2])` followed by web-first container assertions.
