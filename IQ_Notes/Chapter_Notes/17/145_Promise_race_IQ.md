# 145_Promise_race — The First to Finish Wins

**File:** `17_chapter_Promise/145_Promise_race.js`

## Overview
This file covers `Promise.race()`, which accepts an array of Promises and resolves or rejects as soon as the *fastest* Promise in the array settles.

## Main Concept
Imagine pinging three different servers to see which one replies fastest, or implementing a timeout feature (racing an API call against a 5-second timer). `Promise.race()` takes an array of promises and adopts the state (fulfilled or rejected) of whichever promise finishes first.

### Code Example

```javascript
let fastServer = new Promise(function (resolve) {
    setTimeout(() => resolve("Fast (100ms)"), 100);
});

let slowServer = new Promise(function (resolve) {
    setTimeout(() => resolve("Slow (500ms)"), 500);
});

// Racing the two servers
Promise.race([fastServer, slowServer]).then(function (winner) {
    console.log("Winner:", winner); // "Winner: Fast (100ms)"
});
```

### Key Points
- Only the result of the first settled promise is returned. The others continue to run in the background, but their results are completely ignored.
- If the fastest promise rejects, `Promise.race` immediately rejects.

---

## Common Mistakes
- **Assuming the losers are cancelled:** `Promise.race` does not "cancel" or kill the slower promises. E.g., if the slow promise was writing to a database, that write will still happen 400ms later in the background, which can cause unexpected side effects. (True cancellation requires `AbortController`).

---

## Summary
**Key Takeaway:** Use `Promise.race()` when you only care about the result of the very first operation to finish, commonly used for implementing strict timeouts on network requests.
