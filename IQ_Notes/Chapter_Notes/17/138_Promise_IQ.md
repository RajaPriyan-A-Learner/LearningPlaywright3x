# 138_Promise — Introduction to Promises

**File:** `17_chapter_Promise/138_Promise.js`

## Overview
This file introduces the Promise object, which represents the eventual completion (or failure) of an asynchronous operation, providing a much cleaner alternative to Callbacks.

## Main Concept
A Promise is an object that acts as a placeholder for data that you don't have yet, but expect to get in the future. 
A Promise takes an executor function with two arguments: `resolve` (call this when the operation is successful) and `reject` (call this when the operation fails).

### Code Example

```javascript
let order = new Promise(function(resolve, reject) {
    let foodReady = false;
    
    if (foodReady) {
        // If successful, we pass data via resolve
        resolve("Pizza is delivered!");
    } else {
        // If it fails, we pass the error via reject
        reject("Order cancelled");
    }
});

console.log(order); 
// Output: Promise { <rejected> 'Order cancelled' }
```

### Key Points
- A Promise has three states: 
  1. **Pending:** Initial state, neither fulfilled nor rejected.
  2. **Fulfilled (Resolved):** The operation completed successfully.
  3. **Rejected:** The operation failed.
- Once a Promise is either fulfilled or rejected, it is considered **Settled**. Its state cannot change after it has settled.

---

## Common Mistakes
- **Forgetting that the executor runs immediately:** The function you pass into `new Promise(executor)` is executed synchronously the moment the Promise is created, even though the `resolve` or `reject` might happen asynchronously later.

---

## Summary
**Key Takeaway:** A Promise is an object representing future data. You create it by passing an executor function that calls `resolve(data)` on success or `reject(error)` on failure.
