# 158_export — Importing Named Exports and Encapsulation

**File:** `19_chapter_Import_Export/158_export.js`

## Overview
This file illustrates how to consume named exports from another module, execute imported helper functions, and observe encapsulation boundaries in ES Modules where unexported variables remain private to their source module.

---

## Main Concept
Named imports require explicit destructuring syntax with curly braces `{}`. The identifier inside `{}` must match the exact identifier declared in the `export` statement of the source module.

Additionally, modules enforce strict file-level encapsulation. Any variable declared in a module that is not explicitly preceded by the `export` keyword is private and inaccessible from external files.

### Code Example

```javascript
// Consuming named exports from a utility module
import { BASE_URL, formatUpperCaseString } from './161_test_utils.js';

console.log(BASE_URL); // Outputs: "https://app.vwo.com"

let result = formatUpperCaseString("Pramod");
console.log(result);   // Outputs: "PRAMOD"

// Unexported variables inside 161_test_utils.js (e.g., fname)
// cannot be imported or accessed here:
// console.log(fname); // ReferenceError: fname is not defined
```

### Key Points
- Named imports must use the exact names defined in the exporting module unless aliased with the `as` keyword.
- ES Modules automatically execute in strict mode (`'use strict'`), preventing undeclared global variables.
- Module variables not exported remain completely hidden in module scope, preventing accidental global namespace pollution.

---

## Common Mistakes
- **Accessing unexported variables:** Trying to import or reference private module variables (like `fname`) without an `export` statement results in a compile-time or runtime error.
- **Omitting the file extension in Node.js ESM:** In modern Node.js native ESM, relative import paths must include the `.js` extension (e.g., `'./testutil.js'`), otherwise Node throws `ERR_MODULE_NOT_FOUND`.

---

## Summary
**Key Takeaway:** Named imports bring specific exported bindings into scope via curly braces, while non-exported members remain securely encapsulated within their parent module.
