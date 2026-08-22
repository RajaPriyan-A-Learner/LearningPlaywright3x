# 140_Real_Promise_API2 — Handling Promise Rejection (.catch)

**File:** `17_chapter_Promise/140_Real_Promise_API2.js`

## Overview
This file introduces how to handle failures gracefully using the `.catch()` method when a Promise is rejected.

## Main Concept
In the real world, API calls fail (network issues, 500 server errors). When this happens, the Promise calls `reject(error)`. If a Promise is rejected, it completely skips any `.then()` blocks and jumps straight to the nearest `.catch()` block.

### Code Example

```javascript
let apiCall = new Promise(function (resolve, reject) {
    // Simulating an API failure
    reject("500 Internal Server Error");
});

apiCall
    .then(function (data) {
        // This is COMPLETELY SKIPPED because the Promise was rejected
        console.log("Data is success!!", data);
    })
    .catch(function (error) {
        // This catches the rejection
        console.log("Caught Error:", error); // "Caught Error: 500 Internal Server Error"
    });
```

### Key Points
- You chain `.catch()` directly after `.then()`.
- Unhandled Promise rejections (failing to provide a `.catch()`) will cause Node.js applications to crash or throw loud warnings. Always catch your Promises!
- A single `.catch()` at the end of a long chain of `.then()`s will catch an error that occurred in *any* of the preceding steps.

---

## Common Mistakes
- **Trying to use a try/catch block directly on a Promise:** `try { myPromise } catch(e) {}` will NOT work on standard Promise chains because the execution happens asynchronously. You must use `.catch()`. (Note: `try/catch` *does* work with `await`).

---

## Summary
**Key Takeaway:** Use `.catch()` to handle Promise rejections. If a Promise rejects, execution skips `.then()` and goes straight to the `.catch()` block, providing the error reason.
