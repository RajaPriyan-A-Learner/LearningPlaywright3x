# 146_Promise_IQ — Interview Questions: Flow and Returns

**File:** `17_chapter_Promise/146_Promise_IQ.js`

## Overview
This file contains several classic interview snippets testing a deep understanding of Promise chaining, return values inside `.then()`, and error catching behaviors.

## Main Concept
When chaining Promises, whatever you `return` from inside a `.then()` block automatically becomes the resolved value for the *next* `.then()` in the chain. If you throw an Error, it skips down to the nearest `.catch()`.

### Code Example

```javascript
// Interview snippet: Returning values
Promise.resolve(5)
    .then(function (val) {
        return val * 10; // Passes 50 to the next .then
    })
    .then(function (val) {
        console.log("Result:", val); // "Result: 50"
    });

// Interview snippet: Throwing errors
Promise.resolve("start")
    .then(function (val) {
        console.log(val); // "start"
        throw new Error("Broke at step 2"); 
    })
    .then(function () {
        console.log("This will NOT run"); // Skipped!
    })
    .catch(function (err) {
        console.log("Caught:", err.message); // "Caught: Broke at step 2"
    });
```

### Key Points
- `Promise.resolve(value)` is a shortcut to instantly create a fulfilled Promise.
- `throw new Error()` inside a `.then()` automatically rejects the Promise chain, triggering the nearest `.catch()`.
- If a `.then()` does not explicitly `return` anything, it implicitly returns `undefined`. The next `.then()` will receive `undefined`.

---

## Common Mistakes
- **Assuming `.then` always expects a Promise:** You can return a normal primitive value (like `return val + 1;`) from a `.then()`. The JS Engine will automatically wrap it in a resolved Promise for the next `.then()`.

---

## Summary
**Key Takeaway:** In a Promise chain, `return` passes data down to the next `.then()`, while `throw` ejects the flow down to the nearest `.catch()`. If you don't return anything, the next `.then()` receives `undefined`.
