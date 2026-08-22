# 131_CallBack2 — Callbacks in Test Frameworks

**File:** `16_chapter_Callback/131_CallBack2.js`

## Overview
This file connects the basic concept of a callback to how it is used in real-world testing scenarios, specifically mimicking the structure of Playwright tests.

## Main Concept
Testing frameworks like Playwright or Jest use a function (e.g., `test()` or `it()`) that takes two arguments: a string describing the test, and a callback function containing the actual test steps. The framework handles *when* to execute that callback.

### Code Example

```javascript
// Mimicking Playwright's test structure
function test(testName, executeTest){
    console.log("Starting test: " + testName);
    executeTest(); // The framework calls your test steps
}

// Using the structure
test("Verify the login page is working", async () => {
    console.log("Step 1: Navigating to page...");
    console.log("Step 2: Checking title...");
});

// Another example
function garimaStory(action, callMeWhenDone){
    console.log(action);
    console.log("Waiting...");
    callMeWhenDone();
}

garimaStory("starting shopping", () => {
     console.log("lets start shopping....");
});
```

### Key Points
- When you write a Playwright test, you are just writing a massive callback function and passing it to the `test` runner.
- The callback allows the outer function (the test runner) to perform setup (like launching the browser) *before* executing your specific steps.

---

## Common Mistakes
- **Misunderstanding who calls the function:** As a tester, you don't execute the callback; the test runner (like Playwright) executes the callback when it is ready.

---

## Summary
**Key Takeaway:** The familiar `test("name", () => {})` syntax is simply a function that accepts a string and a callback. The framework manages the execution lifecycle of that callback.
