# 89_Function_Arrow2 — Arrow Functions (Multiline)

**File:** `89_Function_Arrow2.js`

## Overview

Arrow functions can contain multiple statements when wrapped in curly braces. Explicit return is needed for multiline arrow functions.

## Multiline Arrow Functions

```javascript
// Single line: implicit return
const doubleMe = (a) => a * 2;

// Multiline: explicit return required
const doubleMe = (a) => {
    return a * 2;
};
```

When you use `{}`, the implicit return disappears. Must use explicit `return`.

## Examples

### Single Expression (Implicit Return)

```javascript
const doubleMe = (a) => a * 2;
doubleMe(5);  // 10
```

### No Parameters

```javascript
const getEnv = () => "staging";
console.log(getEnv());  // "staging"
```

### Multiline with Conditional Logic

```javascript
const getResult = (score) => {
    if (score > 70) return "Pass";
    return "Fail";
}

console.log(getResult(78));  // "Pass"
console.log(getResult(43));  // "Fail"
```

Breaking down the multiline arrow:

```javascript
const getResult = (score) => {  // Arrow function with block
    if (score > 70) return "Pass";  // Explicit return
    return "Fail";  // Explicit return
}
```

## When to Use Single vs Multiline

| Single Line | Multiline |
|---|---|
| `const fn = (x) => x * 2;` | `const fn = (x) => { logic; return x; }` |
| One expression | Multiple statements |
| Implicit return | Explicit return required |
| Callbacks, transformers | Complex logic |

## Common Mistake

```javascript
// ❌ Wrong: block syntax without return
const fn = (x) => {
    x * 2  // This is evaluated but NOT returned
}

// ✅ Right: explicit return
const fn = (x) => {
    return x * 2;
}

// ✅ Also right: single line
const fn = (x) => x * 2;
```

---

## Summary

Arrow functions with `{}` require explicit `return`. Use multiline arrows when logic is complex; use single-line for simple transformations.
