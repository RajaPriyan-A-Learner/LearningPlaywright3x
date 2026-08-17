# 83_TYPE2_Fn — Parameters, No Return Value

**File:** `83_TYPE2_Fn.js`

## Overview

Functions that accept parameters but don't return a value. The input customizes the side effect, but no data flows back to the caller.

## Type 2: With Arguments, No Return

```javascript
function greetByName(name) {
    console.log("Hi", name);
}

greetByName("Pramod");     // Prints: Hi Pramod
greetByName("Dipak");      // Prints: Hi Dipak
greetByName("Meeti");      // Prints: Hi Meeti
greetByName("Sangeetha");  // Prints: Hi Sangeetha

let name1 = greetByName("Sumit");
console.log(name1);  // undefined
```

**Characteristics:**
- Accepts parameters (`name`)
- No `return` statement
- Returns `undefined` if result is captured
- Input **customizes the side effect**, but no output

## Comparison: Parameters Control Behavior

```javascript
// Type 1: Same action every time
function greet() {
    console.log("Hi");
}

// Type 2: Action varies based on input
function greetByName(name) {
    console.log("Hi", name);
}
```

## When to Use Type 2

- Loggers that take configurable messages
- Event handlers that process input without returning
- Setup functions that take configuration
- Validation that performs an action but doesn't compute a result

---

## Summary

Type 2 functions are action-oriented with configurable inputs. Useful when the *what* varies (based on parameters) but the *return* doesn't matter.
