# 80_Function_Basics1 — Function Fundamentals

**File:** `80_Function_Basics1.js`

## Overview

Introduces functions as reusable blocks of code that eliminate repetition. Shows the difference between imperative code (repeated logic) and declarative code (function-based).

## Problem: Without Functions (Code Duplication)

```javascript
let score1 = 85;
let result1 = score1 >= 70 ? "pass" : "fail";
console.log(result1); // "pass"

let score2 = 45;
let result2 = score2 >= 70 ? "pass" : "fail";
console.log(result2); // "fail"
```

Same logic repeated twice—violates DRY (Don't Repeat Yourself).

## Solution: Define and Call a Function

```javascript
function getResult(score) {
    return score >= 70 ? "pass" : "fail";
}

getResult(85);  // "pass"
getResult(45);  // "fail"
```

**Benefits:**
- Logic written once, reused many times
- Easier to maintain and modify
- Clear intent: function name describes what it does

## Function Anatomy

```javascript
function functionName(parameters) {
    // function body
    return result;  // optional
}

functionName(arguments);  // function call
```

1. **Define:** Write function once
2. **Call:** Execute function with `functionName(args)`
3. **Return:** Value passed back to caller

---

## Summary

Functions are the foundation of reducing code duplication. Write logic once as a function, then call it everywhere you need that behavior.
