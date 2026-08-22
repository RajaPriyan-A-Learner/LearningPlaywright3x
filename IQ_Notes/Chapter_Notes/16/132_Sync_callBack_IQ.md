# 132_Sync_callBack — Synchronous Callbacks

**File:** `16_chapter_Callback/132_Sync_callBack.js`

## Overview
This file demonstrates **Synchronous Callbacks**, proving that passing a callback function doesn't automatically make your code asynchronous.

## Main Concept
A synchronous callback is executed immediately during the execution of the higher-order function that calls it. It blocks the rest of the code until it finishes. Array methods like `.map()`, `.filter()`, and `.forEach()` use synchronous callbacks.

### Code Example

```javascript
let testResults = ["PASS", "FAIL", "PASS", "SKIP"];

// The callback function inside forEach is Synchronous
testResults.forEach(function(result, index){
    console.log("Test " + index + " -> " + result);
});

// This line will ONLY print after the entire forEach loop is completely finished.
console.log("All done!");
```

### Key Points
- In a synchronous callback, the main program halts while the callback does its work.
- Array iteration methods are the most common examples of synchronous callbacks in JavaScript.

---

## Common Mistakes
- **Assuming all callbacks are asynchronous:** Because callbacks are heavily used for asynchronous operations (like API calls or Timers), beginners often mistakenly believe *all* callbacks are asynchronous. `forEach` proves this false.

---

## Summary
**Key Takeaway:** Callbacks can be purely synchronous. Array methods like `forEach` execute their callbacks in a blocking, sequential manner before moving to the next line of code.
