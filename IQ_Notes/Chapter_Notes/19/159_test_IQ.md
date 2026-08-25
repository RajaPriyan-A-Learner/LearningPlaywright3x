# 159_test — Disambiguation with Import Aliasing (`as` Keyword)

**File:** `19_chapter_Import_Export/159_test.js`

## Overview
This file demonstrates how to resolve naming collisions when importing identical identifiers from multiple modules using the `as` keyword to create local aliases.

---

## Main Concept
When working on large automation frameworks, multiple utility modules may export variables or functions with identical names (for example, `BASE_URL` defined in both API utils and UI test utils). 

To prevent collision and ambiguous references in the consumer script, JavaScript allows renaming imports at the point of consumption using the `as` keyword: `import { originalName as aliasName } from './module.js'`.

### Code Example

```javascript
// Renaming conflicting imports using 'as'
import { BASE_URL as bul_util, formatTestName } from "./162_utils.js";
import { BASE_URL as bul_testtul } from "./161_test_utils.js";

// Accessing the aliased variables distinctly
console.log(bul_util);     // Outputs: "https://api.example.com"
console.log(bul_testtul);  // Outputs: "https://app.vwo.com"

// Invoking exported function
console.log(formatTestName("login")); // Outputs: "TC_LOGIN"
```

### Key Points
- The syntax `import { Original as Alias }` creates a local binding with the new name in the current module's scope.
- Aliasing can also be performed at export time: `export { original as exportedName }`.
- Useful in Playwright test suites when integrating multiple page objects or mock fixtures with similar helper names.

---

## Common Mistakes
- **Duplicate identifier declaration:** Attempting to import two identical identifiers without aliasing (e.g., `import { BASE_URL } from './a.js'` and `import { BASE_URL } from './b.js'`) produces a `SyntaxError: Identifier 'BASE_URL' has already been declared`.
- **Inverted alias syntax:** Writing `import { Alias as Original }` instead of `import { Original as Alias }`.

---

## Summary
**Key Takeaway:** The `as` keyword enables developers to alias imported identifiers, effectively eliminating name collision issues across diverse modules and libraries.
