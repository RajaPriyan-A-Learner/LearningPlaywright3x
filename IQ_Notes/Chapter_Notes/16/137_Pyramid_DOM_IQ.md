# 137_Pyramid_DOM — The Pyramid of Doom Visualized

**File:** `16_chapter_Callback/137_Pyramid_DOM.js`

## Overview
This file visually represents why nested callbacks are called the "Pyramid of Doom." It shows how sequential logic forces code to indent further and further to the right.

## Main Concept
When writing E2E tests, you often have a strict sequence: Open Browser -> Navigate -> Click -> Assert. If you use callbacks for each step, you must put the next step *inside* the callback of the previous step to guarantee execution order.

### Code Example

```javascript
function step1(callback) {
    console.log("Open browser");
    callback();
}
function step2(callback) {
    console.log("Navigate to page");
    callback();
}
function step3(callback) {
    console.log("Click button");
    callback();
}
function step4(callback) {
    console.log("Assert result");
    callback();
}

// The Pyramid of Doom
step1(function () {
    step2(function () {
        step3(function () {
            step4(function () {
                console.log("Done!");
            });
        });
    });
});
```

### Key Points
- Look at the shape of the nested calls: `>`. This triangular indentation is universally recognized as an anti-pattern in modern JavaScript.
- Code becomes harder to read, harder to refactor, and variable scopes become confusing because the inner-most function has access to all variables declared in the outer functions.

---

## Common Mistakes
- **Trying to flatten without Promises:** Beginners sometimes try to "fix" this by assigning the callbacks to variables and passing them in. This slightly reduces indentation but makes the code execution flow nearly impossible to trace mentally.

---

## Summary
**Key Takeaway:** The Pyramid of Doom is the visual symptom of Callback Hell. It proves that callbacks, while useful for single events, do not scale for complex sequential workflows like E2E testing.
