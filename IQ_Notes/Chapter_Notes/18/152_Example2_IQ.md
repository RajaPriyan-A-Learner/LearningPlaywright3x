# 152_Example2 — Error Handling with Try/Catch in Async/Await

**File:** `18_chapter_Async_Await/152_Example2.js`

## Overview
This file demonstrates how to handle errors gracefully in async/await code using `try/catch/finally` — the same error-handling structure as synchronous JavaScript. This is a massive advantage of `async/await` over raw Promise chains.

## Main Concept
With Promises, you handle errors using `.catch()`. With `async/await`, you use the native `try/catch` block. This is superior because a single `try/catch` can catch **both** synchronous runtime errors (e.g., `TypeError`) and asynchronous Promise rejections — something that `.catch()` cannot do for synchronous errors. The `finally` block always runs, making it ideal for teardown and cleanup.

### Code Example

```javascript
async function testAPI() {
    try {
        // await turns a rejected Promise into a thrown error
        let result = await Promise.reject("503 Service Unavailable");
        console.log('Result', result); // This line is NEVER reached
    } catch (error) {
        // Catches the rejection reason as the error value
        console.log('Error', error); // Output: Error 503 Service Unavailable
    } finally {
        // Always runs — perfect for cleanup (closing DB connections, logging)
        console.log("Clean up!!"); // Output: Clean up!!
    }
}

testAPI();
```

### Key Points
- When `await` encounters a rejected Promise, it **throws** the rejection reason as an error, which is immediately caught by the surrounding `catch` block.
- The `finally` block executes regardless of whether the `try` succeeded or the `catch` caught an error.
- Synchronous code (`step1()`, `step2()`) runs on the main thread immediately after calling `testAPI()` — it does NOT wait for the async function to finish.

---

## Common Mistakes
- **Not wrapping `await` in try/catch:** If a Promise rejects and there is no `try/catch`, the error becomes an **UnhandledPromiseRejection**, which crashes Node.js in modern versions.
- **Thinking `finally` prevents the error from propagating:** `finally` just runs cleanup code. If you have a `catch` block, the error IS handled. If there is no `catch`, the `finally` runs, but the unhandled rejection error still propagates and crashes the program.
- **Forgetting async behavior is non-blocking:** `testAPI()` is called without `await` in the file, so `step1()` and `step2()` run synchronously while the async operation is happening.

---

## Summary
**Key Takeaway:** `async/await` + `try/catch` is the gold standard for error handling in modern JavaScript. It unifies error handling for both synchronous and asynchronous errors under one familiar construct, making your code easier to read, maintain, and debug compared to chained `.catch()` handlers.
