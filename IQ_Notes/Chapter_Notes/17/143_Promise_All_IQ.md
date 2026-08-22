# 143_Promise_All — Parallel Execution (Fail Fast)

**File:** `17_chapter_Promise/143_Promise_All.js`

## Overview
This file introduces `Promise.all()`, a static method used to run multiple independent asynchronous tasks in parallel rather than sequentially.

## Main Concept
If you have multiple API calls that don't depend on each other, running them sequentially with `.then()` wastes time. `Promise.all([p1, p2])` takes an array of promises, runs them concurrently, and returns a *single* Promise that resolves only when *all* of the provided promises resolve.

### Code Example

```javascript
let checkAuth = Promise.resolve("Auth Ok");
let checkDB = Promise.resolve("DB OK");

// Happy Path
Promise.all([checkAuth, checkDB]).then(function (results) {
    console.log("All checks:", results); // ["Auth Ok", "DB OK"]
});

// Unhappy Path (Fail Fast)
Promise.all([
    Promise.resolve("OK"),
    Promise.reject("DB DOWN"), // This fails immediately
    Promise.resolve("OK")
])
    .then(function(r) { console.log(r); }) // Never runs
    .catch(function(err) { console.log("Failed:", err); }); // "Failed: DB DOWN"
```

### Key Points
- `Promise.all` returns an array containing the resolved values in the exact same order as the input array.
- **Fail Fast behavior:** If even a *single* Promise in the array rejects, the entire `Promise.all` immediately rejects with that specific error. It does not wait for the other promises to finish.

---

## Common Mistakes
- **Using Promise.all for independent testing:** If you run 5 test cases inside `Promise.all` and the first one fails, `Promise.all` immediately rejects, meaning you won't get results for the other 4 tests! Use `Promise.allSettled` instead for test reports.

---

## Summary
**Key Takeaway:** Use `Promise.all()` to run independent tasks simultaneously to save time, but remember it has a "Fail Fast" mechanism—one rejection ruins the whole batch.
