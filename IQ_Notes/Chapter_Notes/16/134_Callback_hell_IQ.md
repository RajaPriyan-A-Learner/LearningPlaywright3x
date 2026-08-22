# 134_Callback_hell — The Pyramid of Doom

**File:** `16_chapter_Callback/134_Callback_hell.js`

## Overview
This file illustrates the infamous "Callback Hell" scenario, demonstrating how difficult it becomes to manage multiple sequential asynchronous operations using only callbacks.

## Main Concept
If you have multiple asynchronous tasks where Step 2 depends on Step 1 finishing, Step 3 depends on Step 2, etc., you must nest the callbacks inside one another. This deep nesting creates a triangle-shaped code structure often called the "Pyramid of Doom."

### Code Example

```javascript
// Mocking asynchronous automation steps
function openBrowser(callback) {
    setTimeout(() => { console.log("Step 1"); callback(); }, 500);
}
function goToLoginPage(callback) {
    setTimeout(() => { console.log("Step 2"); callback(); }, 500);
}
function enterCredentials(callback) {
    setTimeout(() => { console.log("Step 3"); callback(); }, 500);
}
function clickLogin(callback) {
    setTimeout(() => { console.log("Step 4"); callback(); }, 500);
}

// THIS IS CALLBACK HELL 👇
openBrowser(function() {
    goToLoginPage(function() {
        enterCredentials(function() {
            clickLogin(function() {
                console.log("Test is Complete!");
            });
        });
    });
});
```

### Key Points
- As the logic gets more complex, the code shifts further to the right, becoming incredibly hard to read and maintain.
- Error handling in this structure is a nightmare, as you would need `if (error)` checks at every single nested level.

---

## Common Mistakes
- **Writing tests using nested callbacks:** Older testing frameworks required this pattern, leading to fragile and unreadable tests. Modern frameworks use Promises and `async/await` to flatten this structure.

---

## Summary
**Key Takeaway:** Callback Hell (or the Pyramid of Doom) occurs when you deeply nest asynchronous callbacks to enforce sequential execution. It results in unreadable and unmaintainable code.
