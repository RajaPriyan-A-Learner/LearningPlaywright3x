# 105_IQ — Interview Question: Function Declarations vs Expressions

**File:** `11_chapter_Function/105_IQ.js`

## Overview
This file demonstrates a classic interview question regarding hoisting differences between function declarations and function expressions (assigned to `const`/`let`).

## Main Concept
Function declarations are fully hoisted to the top of their scope, meaning they can be called before they appear in the code. Function expressions assigned to variables (like `const` or `let`), however, are bound by the variable's hoisting rules—they cannot be accessed before initialization due to the Temporal Dead Zone (TDZ).

### Code Example

```javascript
greet("Alice"); // ✅ Works: Function declaration is fully hoisted

function greet(name) {
    console.log('Hi');
    return `Hello, ${name}!`;
}

sayHi("Bob"); // ❌ TypeError or ReferenceError: Cannot access 'sayHi' before initialization

const sayHi = function (name) {
    return `Hi, ${name}!`;
};
```

### Key Points
- `greet` works because its entire definition is hoisted.
- `sayHi` fails because `const` places the variable in the Temporal Dead Zone (TDZ) until execution reaches the line where it is defined.

---

## Common Mistakes
- **Assuming all functions are hoisted equally:** A very common mistake is assuming that because it's a function, it's hoisted. Only the `function functionName() {}` syntax gets fully hoisted.

---

## Summary
**Key Takeaway:** Function declarations are hoisted completely and can be called early, whereas function expressions follow the hoisting rules of the variables they are assigned to.
