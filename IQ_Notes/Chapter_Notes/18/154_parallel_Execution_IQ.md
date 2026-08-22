# 154_parallel_Execution — Parallel Async Execution with Promise.all

**File:** `18_chapter_Async_Await/154_parallel_Execution.js`

## Overview
This file demonstrates the **parallel async execution pattern** using `Promise.all()` combined with `await`. When multiple async tasks are independent of each other, running them in parallel dramatically reduces total execution time.

## Main Concept
`Promise.all()` takes an array of Promises, fires them all off **simultaneously**, and returns a single new Promise. That new Promise resolves when **all** the input Promises have resolved. By using array destructuring with `await Promise.all(...)`, you can cleanly capture all the results in a single line.

### Code Example

```javascript
function apiCall(name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(name + ": 200 OK");
        }, 1000);
    });
}

async function parallelTest() {
    console.log("Starting of the Test");
    let start = Date.now();

    // All three API calls START at the same moment
    let [r1, r2, r3] = await Promise.all([
        apiCall("Auth Service"),
        apiCall("User Service"),
        apiCall("Payment Service")
    ]);

    // Execution resumes here only after ALL THREE have resolved
    console.log(r1); // "Auth Service: 200 OK"
    console.log(r2); // "User Service: 200 OK"
    console.log(r3); // "Payment Service: 200 OK"

    console.log("Time: ~" + (Date.now() - start) + "ms"); // ~1000ms (not 3000ms!)
}

parallelTest();
```

### Key Points
- **Sequential time vs Parallel time:** Sequential (`await a; await b; await c;`) = ~3000ms. Parallel (`await Promise.all([a,b,c])`) = ~1000ms (the time of the *longest* task).
- `Promise.all()` is **fail-fast**: if ANY one of the Promises rejects, the entire `Promise.all()` immediately rejects with that error, and the results of the other Promises are discarded.
- Array destructuring (`let [r1, r2, r3] = ...`) keeps the results aligned with the order of the input Promises, regardless of which one finished first.

---

## Common Mistakes
- **Using `Promise.all()` for dependent tasks:** If `Task B` needs the result of `Task A`, you cannot run them in parallel. Running a dependent task in parallel will fail because the data it needs isn't available yet.
- **Not handling rejection:** Since `Promise.all()` fails fast, if any sub-task can fail, wrap the entire `await Promise.all(...)` in a `try/catch` block.
- **Assuming order of completion equals order of results:** The Promises in the array may resolve in any order (the fastest resolves first), but the *results* in the destructured array are always returned in the original input order.

---

## Summary
**Key Takeaway:** Use `await Promise.all([...])` when you have multiple independent async operations that can run simultaneously. It is the most powerful performance optimization tool in the async/await toolkit, reducing total execution time from the *sum* of all tasks to the time of the *slowest single* task.
