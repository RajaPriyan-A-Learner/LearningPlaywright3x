# 149_BetterWay — The Ultimate Evolution of Async Code

**File:** `18_chapter_Async_Await/149_BetterWay.js`

## Overview
This file compares the massive structural improvement from Promise chaining to `async/await`, demonstrating how much cleaner E2E testing flows become using this modern syntax.

## Main Concept
By using `async/await`, the execution reads top-to-bottom without any indentation or anonymous callback functions. Under the hood, it is still doing exactly what `.then()` did, but the developer experience is significantly improved.

### Code Example

```javascript
// Function returning a Promise
function apiRequest() {
    return new Promise(function(resolve) {
        resolve({ status: 200 });
    });
}

// Consuming it cleanly
async function runApiRequest() {
    let response = await apiRequest();
    console.log("API status:", response.status); // 200
}

runApiRequest();

// Complex sequence flattened completely
async function runLoginFlow() {
    let msg1 = await openBrowser();
    console.log("Step 1:", msg1);

    let msg2 = await goToLogin();
    console.log("Step 2:", msg2);

    let msg3 = await enterCredentials();
    console.log("Step 3:", msg3);
}
```

### Key Points
- Every `await` pauses the *local execution* of that specific `async` function. It does *not* freeze the entire JavaScript engine (other events and timers can still run in the background).
- Error handling with `async/await` is done using standard `try/catch` blocks, unifying synchronous and asynchronous error handling into one familiar paradigm.

---

## Common Mistakes
- **Awaiting a non-Promise:** You can technically write `await 5;`, and JavaScript won't throw an error (it immediately resolves it as `5`). But it's useless and slightly impacts performance by unnecessarily pushing the execution to the Microtask Queue. Only `await` actual Promises.

---

## Summary
**Key Takeaway:** `async/await` is the "better way." It eliminates all nested callbacks and `.then()` chains, allowing QA automation scripts (like Playwright tests) to be written in a highly readable, step-by-step format.
