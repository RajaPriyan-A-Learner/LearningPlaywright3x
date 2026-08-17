# 88_Function_Arrow1 — Arrow Function Syntax

**File:** `88_Function_Arrow1.js`

## Overview

Arrow functions (`=>`) are a concise syntax for writing functions introduced in ES6. They replace `function` keyword and are the modern standard.

## Arrow Function Basics

```javascript
// Traditional function
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const greet1 = function (name1) {
    return `Hello, ${name1}!`;
}

// Arrow function (most concise)
const greet2 = (name2) => `Hello, ${name2}!`;

console.log(greet("Pramod"));    // "Hello, Pramod!"
console.log(greet1("Pramod"));   // "Hello, Pramod!"
console.log(greet2("Pramod"));   // "Hello, Pramod!"
```

## Conversion Steps

To convert a function to arrow syntax:

1. **Remove** `function` keyword
2. **Remove** `return` keyword (for single expressions)
3. **Remove** curly braces `{}` (for single expressions)
4. **Add** `=>` between parameters and body

```javascript
// Step 1: Start with function
function greet(name) {
    return `Hello, ${name}!`;
}

// Step 2-4: Convert to arrow
const greet = (name) => `Hello, ${name}!`;
```

## Arrow Function Parameter Syntax

```javascript
// No parameters
const sayHi = () => "Hi";

// One parameter (parentheses optional)
const double = x => x * 2;
const double = (x) => x * 2;  // Same

// Multiple parameters (parentheses required)
const add = (a, b) => a + b;
```

## Implicit vs Explicit Return

```javascript
// Implicit return (single expression)
const add = (a, b) => a + b;  // returns a + b

// Explicit return (multiple statements)
const add = (a, b) => {
    const result = a + b;
    console.log(result);
    return result;
};
```

---

## Summary

Arrow functions are concise syntax for single-expression functions. `const fn = (params) => expression;` is the modern standard for callbacks and simple functions.
