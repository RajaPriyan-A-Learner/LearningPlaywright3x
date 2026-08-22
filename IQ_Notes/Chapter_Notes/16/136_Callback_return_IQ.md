# 136_Callback_return — Returning values from Callbacks

**File:** `16_chapter_Callback/136_Callback_return.js`

## Overview
This file demonstrates a higher-order function that executes a synchronous callback and returns the result of that callback to the caller.

## Main Concept
Higher-order functions (functions that accept other functions) can act as wrappers or abstractions. They can execute a callback, take the returned value from that callback, and pass it back to the original execution context.

### Code Example

```javascript
// A higher-order function that abstracts math operations
function calculate(a, b, operation) {
    // It executes the callback (operation) and returns its result
    return operation(a, b); 
}

// Passing an anonymous function that returns the sum
let sum = calculate(10, 5, function (x, y) {
    return x + y;
});

console.log(sum); // 15
```

### Key Points
- This pattern is extremely common in functional programming (like `.reduce()` or `.filter()`).
- The `calculate` function doesn't know *what* math operation it is performing; it just knows it needs to pass `a` and `b` into whatever function you provide. This makes the code highly modular.

---

## Common Mistakes
- **Forgetting to return inside the callback:** If you passed `function (x, y) { x + y; }` (without the `return` keyword), `sum` would be `undefined`. If you use arrow functions without curly braces, the return is implicit: `(x, y) => x + y`.

---

## Summary
**Key Takeaway:** Callbacks can return values just like normal functions. The higher-order function can capture that return value and pass it back up the chain.
