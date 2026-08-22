# 106_Closure_remembers — Closures and State

**File:** `12_chapter_function_Closure/106_Closure_remembers.js`

## Overview
This file demonstrates how closures can be used to create private state and encapsulate logic, specifically by returning an object with methods that interact with a shared private variable.

## Main Concept
A closure gives a function access to its outer scope. When a function returns an object containing methods, those methods retain access to the variables defined in the outer function, even after the outer function has finished executing. This is how we create "private" variables in JavaScript.

### Code Example

```javascript
function makeCounter(start = 0) {
    let count = start; // 'count' is essentially private
    return {
        increment() { count++; },
        decrement() { count--; },
        get() { return count; }
    };
}

let counter = makeCounter(0);
counter.increment();
counter.increment();
console.log(counter.get()); // Outputs: 2
counter.decrement();
console.log(counter.get()); // Outputs: 1
```

### Key Points
- `count` cannot be accessed directly from the outside (e.g., `counter.count` is undefined).
- The methods `increment`, `decrement`, and `get` form closures over the `count` variable, keeping it alive in memory.

---

## Common Mistakes
- **Trying to access the variable directly:** Beginners often try to read or modify `counter.count`. Because `count` is a local variable inside `makeCounter`, it is entirely private and only accessible via the returned closure methods.

---

## Summary
**Key Takeaway:** Closures allow returned inner functions to "remember" and modify variables from their outer function, providing an elegant way to maintain private state.
