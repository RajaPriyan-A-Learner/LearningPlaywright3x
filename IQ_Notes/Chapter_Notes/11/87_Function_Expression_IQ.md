# 87_Function_Expression — Function Declarations vs Expressions

**File:** `87_Funtion_Expression.js`

## Overview

Two syntaxes for defining functions: **function declarations** (traditional) and **function expressions** (assigning function to variable). Both work, but behave differently in edge cases.

## Function Declaration (Traditional)

```javascript
function greet(name) {
    return `Hello, ${name}`;
}

console.log(greet("Bob"));  // "Hello, Bob"
```

- Name is required
- Creates a binding in current scope
- **Hoisted:** can call before declaration (interpreter moves it to top)

## Function Expression (Modern)

```javascript
const greet1 = function (name1) {
    return `Hello, ${name1}`;
}

console.log(greet1("Bob"));  // "Hello, Bob"
```

- Function is anonymous (no name), assigned to variable
- Variable holds the function object
- **Not hoisted:** must declare before calling
- Can use `const` (preferred) or `let`

## Side-by-Side Comparison

```javascript
// Declaration
function greet(name) {
    return `Hello, ${name}`;
}

// Expression (equivalent)
const greet1 = function (name1) {
    return `Hello, ${name1}`;
}

// Both work the same
console.log(greet("Bob"));   // "Hello, Bob"
console.log(greet1("Bob"));  // "Hello, Bob"
```

## Key Difference: Hoisting

```javascript
// This works (declaration is hoisted)
console.log(greet("Bob"));
function greet(name) {
    return `Hello, ${name}`;
}

// This throws ReferenceError (expression not hoisted)
console.log(greet1("Bob"));
const greet1 = function (name1) {
    return `Hello, ${name1}`;
}
```

## When to Use Each

| Declaration | Expression |
|---|---|
| Regular functions | Callbacks, passing to other functions |
| Immediately visible in code | Complex initialization logic |
| Hoisted (loaded first) | Must define before use (safer) |

## Modern Best Practice

Prefer **function expressions** (`const fn = function() {}`):
- Safer (no hoisting surprises)
- Prevents accidentally using before definition
- Aligns with functional programming patterns

---

## Summary

Both syntaxes define functions, but expressions are safer and more predictable. Use function expressions as your default.
