# 195 — Dynamic Typing Baseline in JavaScript

**File:** `25_chapter_TypeScript/195.js`

## Overview
This file establishes the **Dynamic Typing Baseline** in JavaScript before transitioning to TypeScript. It illustrates standard JavaScript variable declarations (`let testName = "Login Test"`) and un-annotated function parameters (`function add(a, b)`), highlighting the flexibility—and lack of compile-time guarantees—inherent in vanilla JavaScript.

---

## Main Concept

In JavaScript, types are associated with values at runtime rather than with variables at declaration time. A variable declared with `let` can hold a string at one moment and be reassigned to a number or object later.

### The Dynamic Typing Dilemma
```javascript
let testName = "Login Test";
testName = 42; // Completely valid in JavaScript, but can cause bugs downstream!

function add(a, b) {
    return a + b;
}
add("5", 10); // "510" (Implicit string coercion instead of addition)
```
Without static type annotations, developer intent is implicit and errors like passing strings into arithmetic functions are only discovered when the code runs.

### Code Example

```javascript
let testName = "Login Test";

function add(a, b) {
    return a + b;
}

console.log(add(10, 20));   // 30 (Numeric addition)
console.log(add("10", 20)); // "1020" (String concatenation)
```

### Key Points
- **Runtime Type Resolution:** JavaScript engines (V8) deduce types on the fly, performing implicit type conversions (`+` behaves as addition for numbers, concatenation for strings).
- **Silent Failures:** Invalid argument types do not throw errors immediately; they produce unexpected values (`NaN`, `"undefined"`, `[object Object]`).
- **Motivation for TypeScript:** Adding static types (TS = JS + Types) introduces compile-time validation, preventing runtime surprises.

---

## Common Mistakes
- **Relying on implicit coercion:** Assuming `add(a, b)` will always calculate numbers without verifying inputs.
- **Inability to enforce contracts:** In large test suites, lack of types leads to passing wrong payload structures to page methods.

---

## Summary
**Key Takeaway:** Vanilla JavaScript's dynamic typing allows rapid prototyping but lacks compile-time safety; `195.js` serves as the baseline showcasing why static typing in TypeScript is needed.
