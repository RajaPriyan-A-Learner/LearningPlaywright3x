# 86_Template_literal — String Interpolation in Functions

**File:** `86_Template_literal.js`

## Overview

Template literals (backtick strings) allow embedding expressions directly in strings without concatenation. Makes functions that build strings cleaner and more readable.

## Template Literal Syntax

```javascript
function greet(name) {
    return `Hello. ${name}`;
}

let op = greet('Alice');
console.log(op);  // "Hello. Alice"
```

**Parts:**
- Backticks (`` ` ``) instead of quotes
- `${expression}` interpolates a value
- Expression evaluated at runtime, result inserted into string

## Traditional String Concatenation (Before)

```javascript
// Old way: string concatenation
function greet(name) {
    return "Hello. " + name;
}
```

vs.

```javascript
// Modern way: template literal
function greet(name) {
    return `Hello. ${name}`;
}
```

## Why Template Literals Are Better

1. **Readability:** Actual string structure is clear
2. **Fewer mistakes:** No `+` operators to misplace
3. **Expression support:** Can compute inside `${}`
4. **Multiline:** Can span lines without `\n` escapes

## Complex Expressions in Template Literals

```javascript
function describe(name, age) {
    return `${name} will be ${age + 1} next year.`;
}

console.log(describe("Bob", 29));  // "Bob will be 30 next year."

// Computing inside ${}
function calculateTotal(price, qty) {
    return `Total: $${price * qty}`;
}
```

---

## Summary

Template literals make string building concise and readable. Always use them instead of string concatenation in modern JavaScript.
