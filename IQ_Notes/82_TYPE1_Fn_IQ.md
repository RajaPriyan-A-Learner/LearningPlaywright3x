# 82_TYPE1_Fn — No Parameters, No Return Value

**File:** `82_TYPE1_Fn.js`

## Overview

Demonstrates functions with no input parameters and no return value. These functions perform an action (side effect) but don't return data to the caller.

## Type 1: No Param, No Return (Void)

```javascript
function greet() {
    console.log("Hi");
}

greet();  // Executes, prints "Hi"
greet();  // Executes again, prints "Hi"
greet();  // Executes again, prints "Hi"

let output = greet();
console.log(output);  // undefined (no return value)
```

**Characteristics:**
- No parameters in parentheses
- No `return` statement
- Function executes for its **side effect** (e.g., logging, modifying global state)
- Caller receives `undefined` if result is captured

## Practical Example

```javascript
function openBrowser() {
    console.log("Open Browser");
    // Actual logic to open a browser
}

openBrowser();  // Performs action, returns nothing
```

## When to Use Type 1

- Setup/teardown operations (open, close, initialize)
- Logging/debugging
- Triggering external effects (animations, API calls)
- When you only care about what the function *does*, not what it *returns*

---

## Summary

Type 1 functions are action-oriented, not data-oriented. They're useful for operations where the side effect matters more than a return value.
