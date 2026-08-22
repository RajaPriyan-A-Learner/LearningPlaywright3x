# 93_Return_function — Function Return Values

**File:** `11_chapter_Function/93_Return_function.js`

## Overview
This file demonstrates how the `return` statement works in JavaScript functions, including returning specific values, returning arrays, and what happens when a function lacks a return statement.

## Main Concept
A function can optionally send a value back to the caller using the `return` keyword. Once a `return` statement is executed, the function immediately stops executing. If no `return` is provided, the function implicitly returns `undefined`.

### Code Example

```javascript
function getStatus(code) {
    if (code >= 200 && code < 300) {
        return "Success";
    } else {
        return "unknown";
    }
}
getStatus(200); // Returns "Success"

// Function with no return statement
function logTest(name) {
    console.log(`Running: ${name}`);
}
// Calling this returns undefined
logTest("Hi this is a log");

function aaa() {
    return [2, 2, 3, 5, 4]; // Returning an array
}
```

### Key Points
- You can return primitives (strings, numbers), complex types (arrays, objects), or even other functions.
- Functions lacking a `return` statement automatically yield `undefined` when called.
- `return` acts as an exit point; any code inside the function below an executed `return` is never reached.

---

## Common Mistakes
- **Expecting a value from a void function:** Assigning the result of `logTest()` to a variable will result in `undefined`, not the logged string.
- **Unreachable code:** Placing logic after a `return` statement inside the same block (it will never execute).

---

## Summary
**Key Takeaway:** The `return` statement dictates a function's output and exit point; omitting it results in an implicit `undefined` return value.
