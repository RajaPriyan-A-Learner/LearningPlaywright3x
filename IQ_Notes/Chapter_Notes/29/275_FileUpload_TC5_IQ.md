# 275_FileUpload_TC5 — Mixed MIME Types & Format Validation

**File:** `29_Playwright/e2e_tests/14_FileUpload/275_FileUpload_TC5.spec.ts`

## Overview
This specification tests uploading a heterogeneous set of file types simultaneously—specifically a PDF (`sample.pdf`), a JPEG image (`sample.jpg`), and a Word document (`sample.doc`). It covers how Playwright infers MIME content types from file extensions and validates the application's file filtering behavior based on the `accept` attribute.

---

## Main Concept
Real-world upload forms often accept multiple document formats (e.g. resumes, cover letters, portfolios). When paths to disk files are passed to `setInputFiles(files)`, Playwright automatically inspects the file extensions (`.pdf`, `.jpg`, `.doc`) and sets the corresponding HTTP `Content-Type` header (e.g. `application/pdf`, `image/jpeg`, `application/msword`) automatically without needing manual MIME declarations.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/';

test.describe('FileUpload handling', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('upload a PDF, a JPG and a DOC together', async ({ page }) => {
      const files = [
         path.join(__dirname, 'sample.pdf'),
         path.join(__dirname, 'sample.jpg'),
         path.join(__dirname, 'sample.doc'),
      ];

      await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles(files);

      const uploadArea = page.locator('div.pf-v6-c-multiple-file-upload');
      await expect(uploadArea).toContainText('sample.pdf');
      await expect(uploadArea).toContainText('sample.jpg');
      await expect(uploadArea).toContainText('sample.doc');
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `275_FileUpload_TC5.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-4`: Imports testing modules and initializes the target PatternFly multi-file URL.
*   `Line 6-10`: Sets up the test suite and handles navigation before tests.
*   `Line 21-25`: Constructs an array of three distinct file paths spanning PDF, JPG, and DOC formats using `path.join(__dirname, ...)`.
*   `Line 28`: Sends all three files simultaneously to the input element via `setInputFiles(files)`.
*   `Line 30-34`: Validates that the dropzone container successfully registered and displays each of the three different filenames.

**Why this approach was chosen:**
The coder chose this test to verify how the application behaves with diverse document types. The component's `accept` attribute filters allowable formats; testing a mixed batch validates that the form accepts valid types without rejecting the entire batch or misidentifying binary encodings.

**Alternative Effective Ways:**
An alternative effective way to expand format validation is to also test negative boundary cases (e.g., attempting to upload an unsupported format like `.exe` or `.docx` when only `.doc` is allowed) and verify that the application displays an error message:
```typescript
const invalidFile = path.join(__dirname, 'sample.exe');
await page.locator('input[type="file"]').setInputFiles([invalidFile]);
await expect(page.locator('.pf-m-danger')).toContainText('File type not accepted');
```
This tests both positive acceptance and negative rejection in the same suite.

---

### Key Points
- Playwright automatically maps file extensions to standard MIME types when reading files from disk.
- Test suites should cover multi-format batches when forms support varied document types.
- Ensure all uploaded filenames are individually asserted in the UI.

---

## Common Mistakes
- Uploading files with unaccepted extensions (e.g., `.docx` when the form's `accept` attribute only permits `.doc`), which causes silent drops.
- Failing to check whether the combined file size exceeds server limits.
- Not verifying UI error states when unsupported file types are included in a batch.

---

## Summary
**Key Takeaway:** Passing an array of mixed file types to `setInputFiles()` verifies that the application correctly handles diverse document formats and adheres to its `accept` attribute rules.
