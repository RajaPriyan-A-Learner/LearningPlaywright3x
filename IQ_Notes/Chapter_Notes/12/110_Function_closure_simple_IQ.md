# 110_Function_closure_simple — Simple Rate Limiter Closure

**File:** `12_chapter_function_Closure/110_Function_closure_simple.js`

## Overview
This file provides a simplified, clear example of using a closure to implement a basic rate limiter pattern.

## Main Concept
Similar to the retry tracker, this code encapsulates a `call` counter inside a generator function `makeRateLimiter`. The returned function checks if the number of calls has exceeded the predefined `limit`.

### Code Example

```javascript
function makeRateLimiter(limit) {
    let call = 0;
    
    function check() {
        call++;
        return call <= limit;
    }
    
    return check;
}

let limiter = makeRateLimiter(3);
console.log(limiter()); // true (Call 1)
console.log(limiter()); // true (Call 2)
console.log(limiter()); // true (Call 3)
console.log(limiter()); // false (Call 4 - Limit exceeded)
```

### Key Points
- `call` and `limit` are trapped in the closure formed by the `check` function.
- Every time `limiter()` is invoked, it updates the hidden `call` state and evaluates it against `limit`.

---

## Common Mistakes
- **Forgetting to invoke the inner function:** If you do `console.log(limiter)`, it prints the function definition itself rather than executing the rate limit check. You must invoke it: `limiter()`.

---

## Summary
**Key Takeaway:** By returning a function from a parent function, you create a closure that safely encapsulates private state variables, a technique heavily used in rate limiting and memoization.
