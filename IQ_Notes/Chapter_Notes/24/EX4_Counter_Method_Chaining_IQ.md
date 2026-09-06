# EX4 — Method Chaining and Fluent Interface Design

**File:** `24_chapter_OOPS_Interview/EX4.js`

## Overview
This file demonstrates **Method Chaining** (the **Fluent Interface Pattern**) in JavaScript through a `Counter` class. By returning `return this` from mutating or action methods (`increment()`, `display()`), multiple method invocations can be chained together in a single expressive statement.

---

## Main Concept

Method chaining is a design pattern where each method on an object returns the object instance itself (`return this`). This allows successive method calls to be chained together via the dot (`.`) operator without storing intermediate references.

### How `return this` Enables Chaining
In `new Counter().increment().increment().increment().display()`:
1. `new Counter()`: Creates a new `Counter` instance with `this.count = 0`.
2. `.increment()`: Increments `count` to `1` and returns `this`.
3. `.increment()`: Increments `count` to `2` and returns `this`.
4. `.increment()`: Increments `count` to `3` and returns `this`.
5. `.display()`: Logs `"Count: 3"` and returns `this`.

### Code Example

```javascript
class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
        return this; // Return current instance to enable chaining
    }

    display() {
        console.log("Count:", this.count);
        return this; // Enables continued chaining
    }
}

new Counter().increment().increment().increment().display();
// Output: Count: 3
```

### Key Points
- **Fluent APIs in Automation:** Test automation frameworks like Playwright, Cypress, and builder libraries heavily rely on fluent chaining (e.g., `page.locator("#btn").click().wait()`).
- **Code Readability:** Reduces redundant variable assignments and creates readable, declarative workflows.
- **Terminal Methods:** Some chainable classes define non-chaining "terminal" methods that return a primitive result or promise rather than `this`.

---

## Common Mistakes
- **Forgetting `return this`:** If a method omits `return this`, it implicitly returns `undefined`, causing the next chained call to fail with `TypeError: Cannot read properties of undefined`.
- **Debugging Complexity:** A long chained statement on a single line makes stack traces and breakpoint debugging harder; breaking chained calls onto new lines is recommended.

---

## Summary
**Key Takeaway:** Returning `return this` from class methods enables method chaining, producing concise and fluent APIs widely used in test automation page builders and locator chains.
