# 276_FileUpload_TC6 — External Shared Fixtures Directory Architecture

**File:** `29_Playwright/e2e_tests/14_FileUpload/276_FileUpload_TC6.spec.ts`

## Overview
This specification addresses clean project directory architecture for test fixtures. Rather than copying test files into each spec folder, it resolves files from a centralized, shared repository directory (`test-data/uploads/`) using relative path navigation with `path.join(__dirname, '..', '..', ...)`.

---

## Main Concept
In large-scale test automation projects, duplicating binary fixtures across dozens of test folders creates repository bloat and maintenance headaches. Storing test data in a dedicated root-level folder (such as `test-data/` or `fixtures/`) is the recommended industry architecture. Navigating from `__dirname` using parent directory indicators (`..`) maintains portability regardless of execution environment.

### Code Example

```typescript
import { test, expect, type Locator } from '@playwright/test';
import path from 'path';

const URL = 'https://www.patternfly.org/components/file-upload/multiple-file-upload/';

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'test-data', 'uploads');

test.describe('FileUpload handling', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto(URL);
   });

   test('upload files from a different directory', async ({ page }) => {
      const files = ['sample.pdf', 'sample.jpg', 'sample.doc']
         .map(name => path.join(UPLOAD_DIR, name));

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

### Code Breakdown: `276_FileUpload_TC6.spec.ts`

**Line-by-line Explanation:**
*   `Line 1-3`: Standard test imports and Node's `path` module.
*   `Line 18`: Establishes the centralized fixtures directory path `UPLOAD_DIR` by navigating two directory levels up from `__dirname` to reach `test-data/uploads`.
*   `Line 20-24`: Configures the describe block and navigation setup.
*   `Line 28-29`: Takes an array of required filenames and maps each through `path.join(UPLOAD_DIR, name)` to produce clean, absolute path strings.
*   `Line 33`: Passes the dynamically resolved file list into `setInputFiles(files)`.
*   `Line 35-39`: Verifies that the dropzone UI accurately lists all three uploaded files.

**Why this approach was chosen:**
The coder chose this pattern to demonstrate professional framework design. By maintaining a single source of truth for test assets, test maintenance is centralized—updating a sample file updates all tests referencing it, without requiring manual synchronization across different test directories.

**Alternative Effective Ways:**
While `path.join(__dirname, '..', '..', ...)` works, deep relative paths like `../../` can become brittle if test files are moved into different subfolders during a refactor. An alternative effective way is to anchor paths to the repository root using `process.cwd()` or by setting a path alias in `tsconfig.json`:
```typescript
const REPO_ROOT = process.cwd();
const UPLOAD_DIR = path.resolve(REPO_ROOT, 'test-data/uploads');
```
Or encapsulate this in a custom Playwright fixture:
```typescript
const test = base.extend<{ uploadFixtures: (filenames: string[]) => string[] }>({
  uploadFixtures: async ({}, use) => {
    use(names => names.map(n => path.resolve(process.cwd(), 'test-data/uploads', n)));
  }
});
```
This decouples the path resolution from the specific location of the test file on disk.

---

### Key Points
- Centralizing test fixtures into `test-data/` prevents file duplication.
- Array mapping (`['a.pdf', 'b.jpg'].map(...)`) is a clean, readable way to construct file lists.
- Assert each file individually in the UI to confirm complete batch acceptance.

---

## Common Mistakes
- Miscounting `..` segments when navigating folder hierarchies, causing `ENOENT: no such file or directory` errors.
- Hardcoding absolute local paths (e.g. `C:\Users\username\...`) that fail on CI runners and other team members' machines.
- Committing large binary files (e.g., >50MB videos) into version control; store large files in external storage or generate synthetic data in tests.

---

## Summary
**Key Takeaway:** Centralizing test fixtures in a dedicated `test-data/` directory and resolving paths relative to `__dirname` or repository root is the best practice for maintainable, enterprise-grade test automation suites.
