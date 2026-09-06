# 196 — TypeScript Compilation Pipeline and Type Erasure

**File:** `25_chapter_TypeScript/196.ts` (and compiled `25_chapter_TypeScript/196.js`)

## Overview
This file demonstrates the **TypeScript Compilation Pipeline** using the TypeScript compiler (`tsc`). It contrasts the original TypeScript source (`196.ts`) featuring static type annotations (`: string`, `: number`) with the resulting compiled JavaScript (`196.js`), illustrating the core principle of **Type Erasure**.

---

## Main Concept

TypeScript is a typed superset of JavaScript. The browser and Node.js engines cannot execute `.ts` files directly. The TypeScript compiler (`tsc`) performs two tasks:
1. **Type Checking:** Validates that variables, function parameters, and return types adhere strictly to their declared contracts.
2. **Transpilation / Type Erasure:** Removes all type annotations, interface declarations, and type keywords, emitting clean, standard JavaScript (`"use strict"`).

### Comparing `.ts` vs Compiled `.js`
- **TypeScript Source (`196.ts`):**
```typescript
let testName1: string = "Login test";
function add_ts(a: number, b: number): number {
    return a + b;
}
console.log(testName1);
```
- **Compiled Output (`196.js`):**
```javascript
"use strict";
let testName1 = "Login test";
function add_ts(a, b) {
    return a + b;
}
console.log(testName1);
```
All type annotations (`: string`, `: number`, `: number`) are completely stripped during compilation.

### Code Example

```typescript
// 196.ts - TypeScript input with type safety
let testName1: string = "Login test";

function add_ts(a: number, b: number): number {
    return a + b;
}

console.log(testName1);
console.log("Sum:", add_ts(10, 20)); // 30

// ❌ TypeScript compiler error if attempted:
// add_ts("10", 20); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Key Points
- **Zero Runtime Overhead:** Because types are erased during compilation, TypeScript carries zero performance overhead at runtime compared to handwritten JavaScript.
- **Strict Mode by Default:** The compiler emits `"use strict"` at the top of the emitted JavaScript file, preventing unsafe JS features (like accidental global variables).
- **Compilation Command:** Running `tsc filename.ts` checks types and produces `filename.js`.

---

## Common Mistakes
- **Expecting types to enforce checks at runtime:** TypeScript types do not validate external data (like JSON from API responses) at runtime; runtime validation libraries (like Zod or Joi) are needed for external inputs.
- **Committing build artifacts unintentionally:** Generated `.js` and `.js.map` files are often placed in `dist/` or `.gitignore` in larger projects.

---

## Summary
**Key Takeaway:** The TypeScript compiler (`tsc`) enforces static type constraints at development time and erases all type annotations during compilation, producing clean standard JavaScript with zero runtime performance cost.
