# 147_Promise_IQ2 — Interview Questions: Static Methods

**File:** `17_chapter_Promise/147_Promise_IQ2.js`

## Overview
This file contains interview scenarios focusing on the static Promise methods: `Promise.resolve()`, `Promise.reject()`, `Promise.all()`, and `Promise.allSettled()`.

## Main Concept
Interviewers love to test if you know the difference between "fail-fast" and "wait-for-all" concurrency models, and if you know how to instantly generate resolved or rejected promises for mock testing.

### Code Example

```javascript
// Quick mocks
Promise.resolve("Quick win").then(console.log);
Promise.reject("Quick loss").catch(console.log);

// Interview Scenario: Promise.all behavior
let t1 = Promise.resolve("PASS");
let t2 = Promise.reject("FAIL"); // Fails immediately!
let t3 = Promise.resolve("PASS");

Promise.all([t1, t2, t3])
    .then(function (r) { console.log("All:", r); })
    .catch(function (err) { console.log("Stopped:", err); }); // Output: "Stopped: FAIL"

// Interview Scenario: Promise.allSettled behavior
Promise.allSettled([t1, t2, t3]).then(function (results) {
    results.forEach(function (r) {
        let val = r.status === "fulfilled" ? r.value : r.reason;
        console.log(r.status + " → " + val);
    });
});
/* Output:
fulfilled → PASS
rejected → FAIL
fulfilled → PASS
*/
```

### Key Points
- `Promise.all` fails immediately on the first rejection. It is strictly "all or nothing."
- `Promise.allSettled` never fails. It waits for all promises to finish and gives you a detailed report of `status`, `value`, and `reason`.

---

## Common Mistakes
- **Confusing `.value` and `.reason`:** When iterating over `Promise.allSettled()` results, a fulfilled promise has a `.value` property containing the data, but a rejected promise has a `.reason` property containing the error. Checking `.value` on a rejected promise returns `undefined`.

---

## Summary
**Key Takeaway:** Know exactly when to use `Promise.all` (when one failure invalidates everything) versus `Promise.allSettled` (when you need the final status of every single independent task).
