# 133_Async_callback — Asynchronous Callbacks

**File:** `16_chapter_Callback/133_Async_callback.js`

## Overview
This file demonstrates **Asynchronous Callbacks**, introducing how JavaScript handles tasks that take time (like network requests or timers) without blocking the rest of the application.

## Main Concept
An asynchronous callback is executed *after* a certain event has occurred or a certain amount of time has passed. While waiting for this to happen, JavaScript does not stop running; it continues to execute the next lines of code sequentially. 

### Code Example

```javascript
console.log("Test 1: started"); // Executes 1st

// setTimeout is a classic asynchronous function
setTimeout(function () {
    console.log("Test 2 : API response received!"); // Executes 3rd (after 5 seconds)
}, 5000);

console.log("Test 3: Moving to next line"); // Executes 2nd (does not wait for setTimeout)
```

### Key Points
- Asynchronous functions (like `setTimeout`, `fetch`, or Playwright actions) hand off their work to the browser or Node.js background threads. 
- JavaScript continues executing the main thread.
- Once the background work is done, the callback function is pushed onto the Event Loop queue to be executed.

---

## Common Mistakes
- **Assuming Sequential Execution:** Writing an API call using callbacks and immediately trying to access the result on the next line. The result will be `undefined` because the next line executes *before* the callback has finished.

---

## Summary
**Key Takeaway:** Asynchronous callbacks allow JavaScript to perform long-running tasks without freezing the program. The callback is executed at a later time, meaning code below the async function will run *before* the callback does.
