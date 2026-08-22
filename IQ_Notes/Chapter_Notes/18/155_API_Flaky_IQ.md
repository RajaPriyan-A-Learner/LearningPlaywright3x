# 155_API_Flaky — Retry Pattern with Async/Await (Real QA Pattern)

**File:** `18_chapter_Async_Await/155_API_Flaky.js`

## Overview
This file implements a **retry pattern** — one of the most important real-world QA automation patterns. It demonstrates how to use `async/await` inside a `for` loop with `try/catch` to automatically retry a failing operation a set number of times before giving up.

## Main Concept
In real-world QA, APIs and UI elements can be intermittently flaky — they fail a few times before succeeding. Instead of hard-failing on the first failure, a robust test retries the operation up to a maximum number of attempts. The `async/await` retry pattern uses a `for` loop to control attempts, `try/catch` inside the loop to catch failures without crashing, and `throw` after the loop if all retries are exhausted.

### Code Example

```javascript
// A factory that creates a flaky API: fails (attempt-1) times before succeeding
function createFlakyAPI(successAttempt) {
    let attempt = 0;
    return function () {
        attempt++;
        if (attempt < successAttempt) {
            return Promise.reject("Attempt " + attempt + ": failed");
        }
        return Promise.resolve("Attempt " + attempt + ": success!");
    };
}

// The core retry engine
async function retryTesting(operation, maxRetries) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            let result = await operation();
            console.log('PASS:', result);
            return result; // Exit the function immediately on success
        } catch (error) {
            console.log('FAIL:', error);
            if (i === maxRetries) {
                // All retries exhausted — throw a descriptive error
                throw new Error("Test failed after " + maxRetries + " attempts");
            }
        }
    }
}

async function runRetryExamples() {
    // Example 1: Succeeds on attempt 3, within the 5-retry limit → PASS
    await retryTesting(createFlakyAPI(3), 5);

    // Example 2: Needs 4 attempts but limit is 2 → exhausts retries → throws
    try {
        await retryTesting(createFlakyAPI(4), 2);
    } catch (error) {
        console.log(error.message); // "Test failed after 2 attempts"
    }
}

runRetryExamples();
```

### Key Points
- `return result;` inside the `try` block is crucial — it breaks out of the `for` loop immediately on success, preventing unnecessary extra retries.
- The `if (i === maxRetries)` check ensures the error is only thrown after the *last* attempt, not after every failed attempt.
- The outer `try/catch` in `runRetryExamples()` handles the case where `retryTesting` itself throws, preventing an unhandled rejection.

---

## Common Mistakes
- **Forgetting `return result` after success:** Without it, the function continues looping even after a success, running the operation more times than needed.
- **Not re-throwing after max retries:** If you only `console.log` the error and don't `throw`, the caller will think the operation succeeded (the function resolves with `undefined`), hiding the failure.
- **Using a fixed delay without exponential backoff:** In production, it's better practice to add a delay between retries (e.g., `await new Promise(r => setTimeout(r, 500 * i))`) so you don't hammer a struggling server.

---

## Summary
**Key Takeaway:** The retry pattern is a foundational QA automation technique. Using `async/await` inside a `for` loop with `try/catch` gives you full, readable control over retry logic — how many attempts to make, how to log each outcome, and how to properly signal total failure after all retries are exhausted.
