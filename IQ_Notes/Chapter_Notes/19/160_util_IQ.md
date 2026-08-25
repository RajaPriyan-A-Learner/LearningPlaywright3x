# 160_util — Consuming Default Exports and Relative Path Navigation

**File:** `19_chapter_Import_Export/160_util.js`

## Overview
This file demonstrates the syntax for consuming default module exports and highlights relative directory path traversal (`./` and `../`) when organizing project folder hierarchies such as subdirectories for logs and utilities.

---

## Main Concept
When importing a default export, you do not use curly braces `{}`. You can assign any identifier name to the imported value. 

Additionally, navigating relative file paths requires understanding dot notations:
- `./` refers to the current directory.
- `../` navigates one level up to the parent directory.
- Subfolder imports follow the pattern `./subfolder/module.js`.

### Code Example

```javascript
// Consuming a default export from a subdirectory module
import log from './logs/157_logger.js';

// Invoking the imported default function
log('Starting test execution'); // Outputs: "[LOG] Starting test execution"

// Named exports from the same module can also be imported if needed:
// import { logBetter } from './logs/157_logger.js';
// logBetter("Starting test case app.vwo.com");
```

### Key Points
- Default imports give total naming freedom to the importer: `import log from './logs/157_logger.js'` works identically to `import myLogger from './logs/157_logger.js'`.
- Clean folder organization (separating logs, pages, fixtures, helpers) is a best practice for enterprise test automation frameworks.
- Relative paths are resolved relative to the location of the current file on disk.

---

## Common Mistakes
- **Adding curly braces to default imports:** Writing `import { log } from './logs/157_logger.js'` when `log` is a default export looks for a named export called `log` rather than the default export, resulting in `undefined` or an import error.
- **Incorrect path relative references:** Forgetting `./` for local file imports (e.g., `import log from 'logs/157_logger.js'`) causes Node/bundlers to look inside `node_modules` instead of the local filesystem.

---

## Summary
**Key Takeaway:** Default exports are imported without curly braces using any chosen identifier name, while relative paths (`./` and `../`) cleanly structure modular subdirectories.
