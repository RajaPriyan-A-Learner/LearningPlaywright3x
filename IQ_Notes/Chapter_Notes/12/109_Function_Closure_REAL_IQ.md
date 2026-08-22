# 109_Function_Closure_REAL — Practical Application of Closures

**File:** `12_chapter_function_Closure/109_Function_Closure_REAL.js`

## Overview
This file demonstrates a real-world use case for closures: creating a retry tracker that persists the number of attempts across multiple function calls without polluting the global scope.

## Main Concept
By wrapping a state variable (`attempts`) inside a factory function (`maxRetryTRacker`), we can generate specialized functions that maintain their own isolated state. Each returned `tryAgain` function forms a closure over its specific `attempts` and `max` variables.

### Code Example

```javascript
function maxRetryTRacker(max) {
    let attempts = 0;
    
    function tryAgain(testName) {
        attempts++;
        if (attempts > max) {
            return `${testName} exceeded max retries (${max})`;
        }
        return `Attempt ${attempts}/${max} for ${testName}`;
    };
    
    return tryAgain;
}

let runTCRetry = maxRetryTRacker(3);
console.log(runTCRetry("Login")); // Attempt 1/3
console.log(runTCRetry("Login")); // Attempt 2/3
console.log(runTCRetry("Login")); // Attempt 3/3
console.log(runTCRetry("Login")); // Login exceeded max retries (3)
```

### Key Points
- The `attempts` variable is securely hidden inside the closure. It cannot be tampered with from the outside (e.g., you can't accidentally reset `attempts` to 0).
- If you call `maxRetryTRacker(5)` again to create another tracker, it will have its own entirely separate `attempts` counter.

---

## Common Mistakes
- **Using a global variable for state:** Often, beginners will place `let attempts = 0` at the top of the file. If you have multiple tests running concurrently, they will all share and corrupt that single global counter. Closures solve this by creating isolated state instances.

---

## Summary
**Key Takeaway:** Closures are a powerful pattern for creating isolated, persistent state (like retry counters or rate limiters) without polluting the global namespace.
