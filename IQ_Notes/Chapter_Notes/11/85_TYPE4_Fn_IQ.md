# 85_TYPE4_Fn — Parameters and Return Value

**File:** `85_TYPE4_Fn.js`

## Overview

The most useful function type: accepts input parameters and returns a computed result. These are pure functions that transform input to output.

## Type 4: With Arguments, With Return

```javascript
function sumOfTwoNumbers(a, b) {
    return a + b;
}

let c = sumOfTwoNumbers(4, 5);
console.log(c);  // 9

console.log(sumOfTwoNumbers(4, 5));  // 9 (can use directly)
```

**Characteristics:**
- Accepts one or more parameters
- Computes a result based on those parameters
- Explicit `return` statement
- Pure: same inputs always produce same output

## Why Type 4 is Most Powerful

```javascript
// Input → Processing → Output
//   (a, b)  →  a + b   →   result
```

- **Reusable:** Works with any input
- **Testable:** Easy to verify (given input X, expect output Y)
- **Composable:** Output of one function can be input to another
- **Side-effect free:** No hidden dependencies

## Common Type 4 Functions

```javascript
// Math
function add(a, b) { return a + b; }

// Validation
function isEven(n) { return n % 2 === 0; }

// Transformation
function toUpperCase(str) { return str.toUpperCase(); }

// Filtering
function isAdult(age) { return age >= 18; }
```

## Type 4 in Real Code

Type 4 functions dominate production code because they're:
- Easy to test (no side effects)
- Easy to reason about (explicit contract)
- Easy to compose (chain outputs to inputs)
- Easy to parallelize (independent of global state)

---

## Summary

Type 4 is the gold standard: input → process → output. These functions are predictable, testable, and reusable. Favor Type 4 when possible.
