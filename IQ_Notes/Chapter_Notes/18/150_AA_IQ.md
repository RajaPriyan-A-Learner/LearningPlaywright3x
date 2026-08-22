# 150_AA — Async Functions Always Return Promises

**File:** `18_chapter_Async_Await/150_AA.js`

## Overview
This file demonstrates two fundamental truths about `async/await`: (1) an `async` function **always** returns a Promise, even when you return a raw string; and (2) the `await` keyword can be used to read the resolved value of any Promise directly inside another `async` function.

## Main Concept
When you declare a function with `async`, JavaScript automatically wraps the return value in `Promise.resolve()`. This means the caller of an `async` function *always* gets a Promise back, and must use either `.then()` or another `await` to consume the resolved value.

### Code Example

```javascript
// async functions ALWAYS return a Promise
async function getTestResults() {
    return "Pass"; // Implicitly becomes Promise.resolve("Pass")
}

// Consuming from a sync context → use .then()
getTestResults().then(function (results) {
    console.log(results); // "Pass"
});

// Consuming from an async context → use await
async function runTest() {
    let result = await Promise.resolve("Login test passed");
    console.log(result); // "Login test passed"

    let result2 = await Promise.resolve("Dashboard test passed");
    console.log(result2); // "Dashboard test passed"
}

runTest();
```

### Key Points
- `async function getTestResults() { return "Pass"; }` is identical to `function getTestResults() { return Promise.resolve("Pass"); }`.
- You must always use `.then()` or `await` to get the value out of an async function.
- Multiple sequential `await` calls inside one `async` function run one after the other, in order.

---

## Common Mistakes
- **Calling `.then()` on a non-async function's return value:** If you forget the `async` keyword, the function returns the raw string, and calling `.then()` on a string will throw a `TypeError: getTestResults(...).then is not a function` error.
- **Using `await` outside an `async` function:** JavaScript will throw a `SyntaxError`. You cannot use `await` at the top level of a standard script (only in `async` functions or ES Module top-level).

---

## Summary
**Key Takeaway:** Every `async` function is a Promise factory. Whether you return a raw value, another Promise, or nothing at all, the function always hands back a Promise to its caller. The `await` keyword is the clean, modern tool for unwrapping that Promise's value inside another `async` function.
