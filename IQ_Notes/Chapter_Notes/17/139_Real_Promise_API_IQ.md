# 139_Real_Promise_API — Handling Promise Resolution (.then)

**File:** `17_chapter_Promise/139_Real_Promise_API.js`

## Overview
This file demonstrates how to extract the successful data out of a Promise once it resolves using the `.then()` method.

## Main Concept
You cannot directly access the data inside a Promise variable (e.g., `let data = myPromise;` will just assign the Promise object, not the data). To access the actual resolved data, you must attach a `.then()` handler to the Promise.

### Code Example

```javascript
// Mocking a successful API call
let apiCall = new Promise(function(resolve, reject) {
    // Simulating success by resolving an object
    resolve({ status: 200, body: "User Data" });
});

// Consuming the Promise
apiCall.then(function(response) {
    console.log(response);         // { status: 200, body: 'User Data' }
    console.log(response.status);  // 200
    console.log(response.body);    // "User Data"
});
```

### Key Points
- The `.then()` method accepts a callback function. This callback is executed **only when** the Promise resolves successfully.
- The argument passed to the `.then(function(data))` callback is exactly whatever was passed into `resolve(data)`.

---

## Common Mistakes
- **Assuming `.then()` is synchronous:** Even if a Promise is resolved immediately (like in the example above), the callback inside `.then()` is pushed to the Microtask Queue and will execute asynchronously after the main thread finishes.

---

## Summary
**Key Takeaway:** You "unwrap" a successful Promise by using the `.then()` method. The `.then()` callback automatically receives the resolved data as its argument.
