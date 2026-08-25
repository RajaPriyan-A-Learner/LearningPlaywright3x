# 161_test_utils — Named Exports and Module Scope Isolation

**File:** `19_chapter_Import_Export/161_test_utils.js`

## Overview
This file demonstrates inline named exports of variables and functions in ES Modules, illustrating how modules share specific capabilities while keeping private implementation details unexported and safe from external modification.

---

## Main Concept
Using the `export` keyword directly preceding a declaration (`export let`, `export const`, `export function`) publishes that symbol as a public named export.

Variables declared in the module without an `export` modifier (such as `let fname = "Pramod";`) are scoped strictly to the module file and cannot be imported by consumer files.

### Code Example

```javascript
// Exporting configuration constants
export let BASE_URL = "https://app.vwo.com";

// Exporting reusable utility function
export function formatUpperCaseString(sname) {
    return sname.toUpperCase();
}

// Module-private variable (Encapsulated, not accessible externally)
let fname = "Pramod";
```

### Key Points
- Inline named exports make it immediately clear at the declaration site which symbols are public.
- Named exports can be exported inline or as a list at the end of the file: `export { BASE_URL, formatUpperCaseString };`.
- Live bindings: Named exports maintain a live link to the source module's variables, meaning changes in the source module reflect in importing modules.

---

## Common Mistakes
- **Mutating imported bindings:** Variables imported via named imports are read-only views in the importing module. Trying to do `BASE_URL = "https://new.com"` in an importing file will throw `TypeError: Assignment to constant variable` or `TypeError: Cannot assign to read only property`.
- **Assuming unexported variables leak to `global`:** Unlike browser `<script>` tags, top-level variables in an ES Module do not attach to `window` or `globalThis`.

---

## Summary
**Key Takeaway:** Named exports define the public API of a module while preserving module encapsulation for unexported variables and private logic.
