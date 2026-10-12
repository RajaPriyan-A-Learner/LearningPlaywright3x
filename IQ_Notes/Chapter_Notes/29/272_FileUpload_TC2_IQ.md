# 272_FileUpload_TC2 — File Upload on Custom Widget Inputs

**File:** `29_Playwright/e2e_tests/14_FileUpload/272_FileUpload_TC2.spec.ts`

## Overview
This specification focuses on automating file uploads within specialized testing widget sandboxes. It targets `#single-upload` on The Testing Academy's widget application, demonstrates single file assignment, and illustrates debugging pauses during upload lifecycle testing.

---

## Main Concept
Modern web applications often wrap the native file input `<input type="file">` inside customized UI wrappers (hiding the ugly default browser file button with `opacity: 0` or `display: none`). Playwright's `setInputFiles()` works on these hidden inputs without requiring manual visibility forcing or Javascript dispatchers, as long as the element exists in the DOM.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://app.thetestingacademy.com/playwright/widgets/upload-download';

test.describe('FileUpload handling', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(URL, { waitUntil: 'domcontentloaded' });
   });

   test('locate FileUpload and upload', async ({ page }) => {
      const filePath = path.join(__dirname, 'testdata.txt');
      console.log(filePath);
      await page.locator("#single-upload").setInputFiles([filePath]);
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `272_FileUpload_TC2.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-4`: Imports core test types, Node's `path` utility, and points to the Testing Academy upload/download widget URL.
*   `Line 6-10`: Establishes the describe block and navigates to the target page with `{ waitUntil: 'domcontentloaded' }`.
*   `Line 16-17`: Assembles the full filesystem path to `testdata.txt` and prints it to the console.
*   `Line 19`: Targets `#single-upload` and executes `.setInputFiles([filePath])` to attach the local text file.

**Why this approach was chosen:**
The coder chose this concise structure to test file upload behavior on a dedicated widget testbed, isolating the file selection mechanism from complex multi-step submission workflows.

**Alternative Effective Ways:**
After uploading a file, you should always assert the UI feedback (e.g. filename display, progress indicator, or submit enablement). An alternative effective way that includes post-upload verification is:
```typescript
const filePath = path.join(__dirname, 'testdata.txt');
const input = page.locator('#single-upload');
await input.setInputFiles(filePath);
await expect(page.locator('#file-name-preview')).toHaveText('testdata.txt');
```
Additionally, passing a single string directly (`input.setInputFiles(filePath)`) is cleaner than wrapping single files in an array literal `[filePath]`.

---

### Key Points
- `setInputFiles()` accepts either a string path or an array of string paths.
- Can set files on hidden or custom-styled file inputs as long as they are present in the DOM.
- Use `page.pause()` for interactive visual inspection during local development, but ensure it is removed before merging into CI pipelines.

---

## Common Mistakes
- Leaving `page.pause()` active in code deployed to CI, causing build timeouts.
- Targeting the visible styled button wrapper rather than the actual `<input type="file">` node.
- Forgetting to assert that the uploaded file is acknowledged by the UI.

---

## Summary
**Key Takeaway:** Custom file upload widgets can be automated reliably by calling `setInputFiles()` directly on the underlying input element.
