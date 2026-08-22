# 148_Async_Await — Introduction to Async/Await

**File:** `18_chapter_Async_Await/148_Async_Await.js`

## Overview
This file introduces the modern `async/await` syntax, which is syntactic sugar over Promises, designed to make asynchronous code look and behave like synchronous code.

## Main Concept
Chaining `.then()` is better than Callback Hell, but it still requires passing callback functions. `async/await` allows you to pause the execution of a function until a Promise resolves, assigning the resolved value directly to a variable.

### Code Example

```javascript
// The Old Way (Promise Chaining)
getToken()
    .then(function(token) {
        return getUser(token);
    })
    .then(function(user) {
        console.log(user);
    });

// The Modern Way (Async / Await)
async function run() {
    let token = await getToken(); // Execution pauses here until token is fetched
    let user = await getUser(token); // Execution pauses here until user is fetched
    console.log(user);
}
```

### Key Points
- You can ONLY use the `await` keyword inside a function declared with the `async` keyword.
- An `async` function automatically wraps its return value in a Promise, even if you return a raw primitive.
- This is the standard syntax used by Playwright for almost all browser interactions (e.g., `await page.click('button')`).

---

## Common Mistakes
- **Forgetting `await`:** If you write `let token = getToken();`, `token` will be a pending Promise object, not the actual string token you need. When you pass it to `getUser(token)`, the API will fail because it receives an object instead of a string.

---

## Summary
**Key Takeaway:** `async/await` is the modern standard for handling asynchronous code in JavaScript. It flattens Promise chains, allowing you to assign resolved asynchronous values directly to variables as if the code were completely synchronous.
