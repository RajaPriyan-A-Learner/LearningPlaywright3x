# 81_Function_Basic2 — Function Reuse and Parameters

**File:** `81_Function_Basic2.js`

## Overview

Demonstrates defining a function once and calling it multiple times with different arguments. Shows how parameters allow the same function to work with different inputs.

## Define Once, Call Multiple Times

```javascript
function sayHello(name) {
    console.log(name);  // console.log can contain 1000 lines of logic
}

sayHello("PrrammodDutta");  // First call
sayHello("Siba");           // Second call
sayHello("Kishan");         // Third call
```

**Key idea:** The function body executes each time it's called, but you only write it once.

## How Parameters Work

- **Parameter:** Variable in the function definition (`name` in `sayHello(name)`)
- **Argument:** Value passed when calling the function (`"PrrammodDutta"` in `sayHello("PrrammodDutta")`)
- **Scope:** Parameter only exists inside the function

Each call to `sayHello()` binds its argument to the `name` parameter for that execution:

```javascript
sayHello("PrrammodDutta");  // name = "PrrammodDutta" inside this call
sayHello("Siba");           // name = "Siba" inside this call
sayHello("Kishan");         // name = "Kishan" inside this call
```

---

## Summary

Parameters turn functions into templates—define once with placeholders, then instantiate many times with different data. This is the foundation of abstraction.
