# 90_REAL — Practical Function Example (HTTP Status Validator)

**File:** `90_REAL.js`

## Overview

Demonstrates real-world function patterns: the same logic implemented three ways (declaration, expression, arrow) to show how all syntaxes achieve identical behavior.

## The Problem

Validate HTTP status codes. A status between 200–300 is successful; outside that range is an error.

## Three Equivalent Implementations

### 1. Function Declaration

```javascript
function validateStatusCode(status) {
    if (status >= 200 && status <= 300) {
        console.log("Request is fine!")
    }
}

validateStatusCode(200);  // "Request is fine!"
```

### 2. Function Expression

```javascript
const validateStatusCode_Exp = function (status) {
    if (status >= 200 && status <= 300) {
        console.log("Request is fine!")
    }
}

validateStatusCode_Exp(200);  // "Request is fine!"
```

### 3. Arrow Function

```javascript
const validateStatusCode_Arrow = (status) => {
    if (status >= 200 && status <= 300) {
        console.log("Request is fine!");
    }
}

validateStatusCode_Arrow(200);  // "Request is fine!"
```

## Which to Use?

All three are functionally equivalent. **Modern preference: arrow function** because:
- Concise syntax
- No hoisting surprises
- Consistent with functional programming patterns
- Works great in callbacks and array methods

## Real-World Pattern

This pattern appears everywhere in production code:

```javascript
// API request validator
const isValidResponse = (status) => {
    return status >= 200 && status < 300;
}

// User age validator
const isAdult = (age) => {
    return age >= 18;
}

// Payment status checker
const isSuccessful = (status) => {
    return status === "completed" || status === "success";
}
```

---

## Summary

All three function syntaxes work identically. In modern code, arrow functions are preferred for their clarity and simplicity.
