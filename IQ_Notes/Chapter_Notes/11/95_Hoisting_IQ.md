# 95_Hoisting — The Basics of Var Hoisting

**File:** `11_chapter_Function/95_Hoisting.js`

## Overview
This file explores the foundational concept of "Hoisting" in JavaScript, demonstrating how the engine processes `var` declarations before executing code.

## Main Concept
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. For `var`, the declaration is hoisted and initialized with `undefined`. The assignment of the value happens later when the execution reaches that specific line.

### Code Example

```javascript
console.log(a); // Output: undefined
var a = "Pramod";
console.log(a); // Output: "Pramod"

// What the JS Engine actually does:
// ---- Phase 1: Memory Creation ----
// var a = undefined;
// ---- Phase 2: Execution ----
// console.log(a); 
// a = "Pramod";
// console.log(a);
```

### Key Points
- Hoisting is a **mental model**. The code isn't physically moved; rather, the JS engine parses and allocates memory for declarations during a compilation phase before running the code.
- Variables declared with `var` are accessible before their declaration line without throwing an error, but their value is `undefined`.

---

## Common Mistakes
- **Expecting ReferenceErrors with var:** Beginners often expect `console.log(a)` before `var a = 10` to crash the script. It simply prints `undefined`.
- **Confusing declaration and assignment:** Only the declaration (`var a;`) is hoisted. The assignment (`= "Pramod"`) stays exactly where it was written.

---

## Summary
**Key Takeaway:** `var` declarations are hoisted to the top of their scope and initialized with `undefined` during the compilation phase, allowing access before the assignment line.
