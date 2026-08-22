# 120_Object_IQ1 — Interview Question: Object Methods and `this`

**File:** `14_chapter_Objects/120_Object_IQ1.js`

## Overview
This brief file highlights a common interview scenario regarding object methods and the usage of the `this` context.

## Main Concept
When a function is declared as a property of an object (a method), it has access to the object itself via the `this` keyword. `this` refers to the object that is executing the current function.

### Code Example

```javascript
const user = {
    name: "Pramod",
    printName() {
        return this.name;
    }
}

console.log(user.printName()); // "Pramod"
```

### Key Points
- The `this` context is determined dynamically by *how* the function is called.
- Because it is called as `user.printName()`, the object to the left of the dot (`user`) becomes the `this` context inside the function.

---

## Common Mistakes
- **Using Arrow Functions for Methods:** If `printName` was written as an arrow function `printName: () => { return this.name; }`, it would NOT work. Arrow functions do not bind their own `this` context; they inherit it from the surrounding lexical scope (usually the `window` or `global` object).

---

## Summary
**Key Takeaway:** Always use standard function syntax (e.g., `methodName() {}`) for object methods so that the `this` keyword correctly points to the object itself.
