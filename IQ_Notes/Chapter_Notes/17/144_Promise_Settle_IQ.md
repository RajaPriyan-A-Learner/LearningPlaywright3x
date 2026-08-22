# 144_Promise_Settle — Parallel Execution (Wait for All)

**File:** `17_chapter_Promise/144_Promise_Settle.js`

## Overview
This file explores `Promise.allSettled()`, an alternative to `Promise.all()` that never "fails fast", but instead waits for every single Promise to finish regardless of success or failure.

## Main Concept
When generating a test report or making multiple independent API calls where partial success is acceptable, you don't want a single failure to crash the whole operation. `Promise.allSettled()` waits for all promises to resolve OR reject, and returns an array describing the outcome of each.

### Code Example

```javascript
Promise.allSettled([
    Promise.resolve("Test A Passed!"),
    Promise.reject("Test B failed"),
    Promise.resolve("Test C passed")
]).then(function (results) {
    
    // Iterating through the detailed report
    results.forEach(function (r, i) {
        // r.status will be either 'fulfilled' or 'rejected'
        let details = r.value || r.reason;
        console.log(`Test ${i + 1}: ${r.status} - ${details}`);
    });
});

/* Output:
Test 1: fulfilled - Test A Passed!
Test 2: rejected - Test B failed
Test 3: fulfilled - Test C passed
*/
```

### Key Points
- `Promise.allSettled()` *always* resolves (it never goes to `.catch()`), even if every single promise inside it rejected!
- It returns an array of objects. Each object has a `status` ("fulfilled" or "rejected").
- If fulfilled, it has a `value` property. If rejected, it has a `reason` property.

---

## Common Mistakes
- **Trying to access the data directly:** Beginners often try `results[0]` expecting the raw data (like `Promise.all` provides), but they get an object `{ status: 'fulfilled', value: 'Data' }`. You must extract `.value` or `.reason`.

---

## Summary
**Key Takeaway:** `Promise.allSettled()` is the safest way to execute multiple parallel tasks when you want the complete results (successes and failures) of every task without the operation aborting early.
