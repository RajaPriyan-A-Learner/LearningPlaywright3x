# 91_IIFE — Immediately Invoked Function Expression

**File:** `91_IIFE.js`

## Overview

IIFE (pronounced "iffy") is a function that executes immediately after it's defined. Useful for creating isolated scopes and avoiding global namespace pollution.

## IIFE Syntax

```javascript
// Traditional function (requires explicit call)
function name1() {
    console.log("Hi")
}
name1();  // Must call separately

// IIFE (executes immediately)
(function() {
    console.log("Anonymous Fun");
})();  // Parentheses at end invoke it

(function () {
    console.log("Staging")
})();  // Executes immediately
```

## Breaking Down IIFE

```javascript
(function() {      // Anonymous function, wrapped in parens
    console.log("Code runs immediately");
})();              // () at end invokes it immediately
```

Four parts:
1. `(` — Outer parentheses group the function
2. `function() { ... }` — Anonymous function definition
3. `)` — Close grouping
4. `()` — Invoke with these parentheses

## Arrow Function IIFE

Modern way using arrow syntax:

```javascript
(() => {
    console.log("Setup complete");
})();
```

## Why Use IIFE?

### 1. Create Private Scope (No Global Pollution)

```javascript
// Without IIFE: pollutes global scope
var counter = 0;  // Everyone can access/modify

// With IIFE: encapsulated
(function() {
    var counter = 0;  // Only visible here
    console.log(counter);
})();
console.log(counter);  // ReferenceError: counter not defined
```

### 2. Execute Setup Code Once

```javascript
// Initialize before app starts
(() => {
    const config = loadConfig();
    const db = connectDatabase(config);
    console.log("App initialized");
})();
```

### 3. Avoid Race Conditions in Loops

```javascript
// Without IIFE: all closures capture final i
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // Prints: 3, 3, 3
}

// With IIFE: each closure gets its own i
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 100);  // Prints: 0, 1, 2
    })(i);
}
```

## Modern Alternative: Block Scope

With `let`/`const`, block scope replaces IIFE for most use cases:

```javascript
// Old way: IIFE for scope
(function() {
    var x = 10;
})();

// Modern way: block scope
{
    let x = 10;
}
```

## Real-World Usage

Today, IIFE is less common due to modules and closures, but you'll see it:
- Initialization routines
- Module patterns (wrapping libraries)
- Old code (before ES6 modules)

---

## Summary

IIFE executes immediately and creates its own scope, isolating variables. While less essential in modern ES6+ code, it's still useful for initialization and one-off operations.
