# 141_Promise_Finally — Cleanup and Teardown (.finally)

**File:** `17_chapter_Promise/141_Promise_Finally.js`

## Overview
This file demonstrates the `.finally()` method, which executes code regardless of whether the Promise was resolved or rejected.

## Main Concept
Sometimes you need to perform an action no matter the outcome of the Promise. For instance, in UI testing, you might turn on a "Loading..." spinner before an API call. Whether the call succeeds or fails, you *must* turn off that spinner. `.finally()` is perfect for this.

### Code Example

```javascript
let apiCall = new Promise(function(resolve, reject) {
    resolve({ status: 200 }); // Try changing this to reject("error")
});

apiCall
    .then(function(data) {
        console.log("Success:", data);
    })
    .catch(function(error) {
        console.log("Failed:", error);
    })
    .finally(function() {
        // Always Executed!
        console.log("Cleanup: Closing connection...");
    });
```

### Key Points
- `.finally()` does not receive any arguments (it doesn't know if the Promise succeeded or failed, it just knows it finished).
- It is commonly used for teardown operations: closing database connections, hiding loading spinners, or closing browsers in test frameworks.

---

## Common Mistakes
- **Expecting data in `.finally(data)`:** Developers sometimes try to access the resolved data or error message inside the `finally` block. It will be undefined. `finally` is strictly for side-effects and cleanup.

---

## Summary
**Key Takeaway:** Chain `.finally()` at the end of your Promises to run teardown or cleanup code that must execute unconditionally, regardless of success or failure.
