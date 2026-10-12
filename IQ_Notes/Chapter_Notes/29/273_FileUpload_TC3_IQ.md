# 273_FileUpload_TC3 — In-Memory Buffer File Uploads

**File:** `29_Playwright/e2e_tests/14_FileUpload/273_FileUpload_TC3.spec.ts`

## Overview
This specification demonstrates how to upload files directly from in-memory binary data without saving dummy files to disk. Using Node's native `Buffer.from(...)`, the test constructs two synthetic JPEG files on the fly and passes them to PatternFly's multi-file upload dropzone component.

---

## Main Concept
Managing fixture files on disk (like temporary `.jpg`, `.pdf`, `.csv` files) can clutter the test repository and cause file-locking issues during parallel multi-worker execution.
Playwright supports **in-memory file upload payloads** by accepting an object with:
- `name`: Target filename (e.g. `file1.jpg`)
- `mimeType`: Media type string (e.g. `image/jpeg`)
- `buffer`: Node.js `Buffer` containing raw binary or UTF-8 text bytes

This eliminates the need to maintain static asset files in version control.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/';

test.describe('FileUpload handling', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('locate FileUpload and upload', async ({ page }) => {
      await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles([
         {
            name: 'file1.jpg',
            mimeType: 'image/jpeg',
            buffer: Buffer.from('image from thetestingacademy code')
         },
         {
            name: 'file2.jpg',
            mimeType: 'image/jpeg',
            buffer: Buffer.from('this is test')
         }
      ]);
   });
});
```

---

## Line-by-Line Code Breakdown & Coder Rationale

### Code Breakdown: `273_FileUpload_TC3.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-4`: Imports test fixtures and points to PatternFly's component documentation page featuring an enterprise multi-file dropzone.
*   `Line 6-10`: Defines the test suite and opens the target component in `beforeEach`.
*   `Line 15`: Locates the file input nested inside PatternFly's container: `page.locator("div.pf-v6-c-multiple-file-upload input")`.
*   `Line 16-27`: Calls `setInputFiles` passing an array of two in-memory file objects. Each object provides `name`, `mimeType`, and a dynamic `Buffer.from(...)` containing raw string bytes representing file contents.

**Why this approach was chosen:**
The coder chose buffer objects to avoid creating and storing dummy files in git. This approach ensures maximum test isolation, runs smoothly in containerized environments (like Docker or GitHub Actions) without filesystem dependencies, and allows dynamic test data generation (e.g., embedding timestamps or UUIDs inside the buffer).

**Alternative Effective Ways:**
While constructing buffers with simple text works for testing basic upload handling, some backend systems validate image headers (magic bytes) and reject invalid binary streams. An alternative effective way when the application enforces real image validation is to create minimal valid image byte arrays (e.g., a 1x1 transparent PNG buffer `Buffer.from('iVBORw0KGgo...', 'base64')`). Additionally, you should assert that PatternFly successfully added the files to the UI:
```typescript
const dropzone = page.locator('div.pf-v6-c-multiple-file-upload');
await expect(dropzone).toContainText('file1.jpg');
await expect(dropzone).toContainText('file2.jpg');
```

---

### Key Points
- `setInputFiles` accepts `{ name: string, mimeType: string, buffer: Buffer }` objects.
- In-memory uploads prevent fixture clutter and file I/O contention during parallel test runs.
- You can upload multiple files simultaneously by passing an array of buffer objects.

---

## Common Mistakes
- Omitting `mimeType` in buffer upload objects; while optional in some browsers, servers often reject uploads with undefined Content-Type.
- Assuming simple text strings inside a Buffer will pass strict server-side image verification.
- Forgetting that the input element in multi-file upload components might require the HTML `multiple` attribute.

---

## Summary
**Key Takeaway:** In-memory buffer uploads (`Buffer.from(...)`) allow dynamic, isolated file generation in Playwright without needing static fixture files on disk.
