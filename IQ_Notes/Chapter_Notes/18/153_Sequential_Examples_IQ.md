# 153_Sequential_Examples — Sequential Async Execution

**File:** `18_chapter_Async_Await/153_Sequential_Examples.js`

## Overview
This file demonstrates the **sequential async execution pattern**, where each step must wait for the previous one to complete before starting. This is used when Step 2 depends on the result of Step 1, or when the order of operations is critical.

## Main Concept
When you write multiple `await` statements one after another inside an `async` function, they execute **serially** — the JavaScript engine pauses at each `await` until the Promise resolves, then moves to the next line. This is the correct approach when operations are **dependent** on each other (e.g., you need a login token before you can access a dashboard).

### Code Example

```javascript
function apiCall(name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(name + ": 200 OK");
        }, 1000); // Simulates a 1-second network delay
    });
}

async function sequentialTest() {
    console.log("Starting of the Test");
    let start = Date.now();

    let r1 = await apiCall("Login");       // Waits 1s
    console.log(r1);

    let r2 = await apiCall("Dashboard");   // Waits another 1s (starts AFTER r1)
    console.log(r2);

    let r3 = await apiCall("Report");      // Waits another 1s (starts AFTER r2)
    console.log(r3);

    console.log("Time: ~" + (Date.now() - start) + "ms"); // ~3000ms total
}

sequentialTest();
```

### Key Points
- Total execution time is the **sum** of all individual delays (~3000ms for three 1-second calls).
- Each `await` is a **hard stop** — `r2` will not start until `r1` is fully resolved.
- This is the right pattern when there is a **data dependency** (e.g., you need `r1`'s token to make the `r2` request).
- If the operations are **independent** of each other, use `Promise.all()` instead for better performance.

---

## Common Mistakes
- **Using sequential `await` for independent tasks:** If three API calls have no data dependency, running them sequentially wastes time. Use `Promise.all([apiCall("A"), apiCall("B"), apiCall("C")])` to run them in parallel and finish in ~1000ms instead of ~3000ms.
- **Thinking async functions are parallel by default:** Multiple `await` statements in sequence are NOT parallel. They are strictly sequential, one at a time.

---

## Summary
**Key Takeaway:** Sequential `await` statements are the correct tool when your operations have a dependency chain. The trade-off is time: execution takes as long as the sum of all individual operations. When operations are independent, switch to `Promise.all()` for a significant performance gain.
