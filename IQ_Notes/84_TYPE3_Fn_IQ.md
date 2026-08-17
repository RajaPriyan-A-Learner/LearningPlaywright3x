# 84_TYPE3_Fn — No Parameters, With Return Value

**File:** `84_TYPE3_Fn.js`

## Overview

Functions that take no input but return a computed value. Useful for operations that generate data without needing external input (constants, factories, or state getters).

## Type 3: No Param, With Return

```javascript
function sayHello() {
    console.log("Hi");
    return "helllo";
}

let call = sayHello();
console.log(call);  // "helllo"
```

**Characteristics:**
- No parameters
- Explicit `return` statement
- Caller receives the returned value, not `undefined`
- Function is deterministic (always returns the same value)

## Return Any Data Type

```javascript
function greetByHi() {
    return [12, 2, 3, 3, 2];
}

let op = greetByHi();
console.log(op);  // [12, 2, 3, 3, 2]
```

Type 3 can return:
- Strings, numbers, booleans
- Arrays and objects
- Even functions (higher-order functions)

## When to Use Type 3

- Getters (retrieve current configuration, status)
- Factory functions (create and return objects)
- Constants wrapped in functions
- Computed values that don't depend on input
- Lazy initialization (compute on first call)

**Example:**
```javascript
function getCurrentUser() {
    return { id: 1, name: "Alice" };
}

function getStatusMessage() {
    return "All systems operational";
}
```

---

## Summary

Type 3 functions are output-focused. They produce data without depending on input, useful for factories and getters.
