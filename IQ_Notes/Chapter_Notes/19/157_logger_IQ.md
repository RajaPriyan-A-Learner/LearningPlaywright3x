# 157_logger — Default Exports and Named Exports in Utility Modules

**File:** `19_chapter_Import_Export/logs/157_logger.js`

## Overview
This file demonstrates the dual export mechanism in ES Modules (ESM), combining a single default export with named auxiliary exports. It illustrates how logging utility modules are structured in JavaScript and automated testing frameworks.

---

## Main Concept
In JavaScript ES Modules, a file can have at most one `default export`, but multiple `named exports`. 

- A **default export** (`export default function log`) represents the primary purpose of the module. Consuming files can import it with any arbitrary identifier without curly braces `{}`.
- A **named export** (`export function logBetter`) represents supplementary utilities. Consuming files must import it by its exact identifier wrapped in curly braces.

### Code Example

```javascript
// Default Export -> Export One Primary Utility
export default function log(message) {
    console.log("[LOG] " + message);
}

// Named Export -> Export Specific Secondary Helper
export function logBetter(message) {
    console.log("-----------");
    console.log("[LOGS] " + message);
    console.log("-----------");
}
```

### Key Points
- A module can only contain one `export default` declaration.
- `export default` allows anonymous declarations or named function exports.
- Named exports enable tree-shaking by module bundlers like Webpack, Vite, and Rollup, allowing unused helper functions to be excluded from production bundles.
- Common use case in Playwright/Automation: Exporting the main test runner or page fixture as default, and utility assertions as named exports.

---

## Common Mistakes
- **Attempting multiple default exports:** Declaring more than one `export default` in the same file will trigger a syntax error: `SyntaxError: Only one default export allowed per module`.
- **Mixing import brackets:** Importing a default export using curly braces (e.g., `import { log } from './157_logger.js'`) will fail if `log` was exported as `default` rather than a named export.

---

## Summary
**Key Takeaway:** Use `export default` for the primary entity of a module and named `export` for additional helper functions, ensuring clean modular separation and flexible import capabilities.
