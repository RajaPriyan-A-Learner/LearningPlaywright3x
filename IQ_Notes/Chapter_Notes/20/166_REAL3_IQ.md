# 166_REAL3 — Domain Modeling in Test Automation with Classes and Methods

**File:** `20_chapter_Class_objects/20_01_Classes_Objects/166_REAL3.js`

## Overview
This file demonstrates real-world test automation domain modeling using JavaScript classes. It models a `TestCase` entity encapsulating test metadata (name, status, priority) along with an instance method (`display`) that operates on the instance's unique attributes, showing how Object-Oriented Programming (OOP) standardizes test reporting structures.

---

## Main Concept

In software test engineering and automation frameworks, classes provide structured blueprints to encapsulate data and behavior of test artifacts (e.g., Test Cases, Test Runs, Page Elements, API Requests).

### Key Architectural Concepts:
1. **State Encapsulation:** Each `TestCase` instance encapsulates its own state (`name`, `status`, `priority`).
2. **Prototype Method Sharing:** Instance methods such as `display()` reside on `TestCase.prototype`, ensuring that all test case instances share a single function implementation in memory rather than duplicating it per instance.
3. **Dynamic Context Resolution:** The `this` keyword inside `display()` dynamically resolves to whichever test instance called it (`loginTest_ref` or `signupTest_ref`).

### Code Example

```javascript
class TestCase {
    constructor(name, status, priority) {
        this.name = name;
        this.status = status;
        this.priority = priority;
    }

    display() {
        console.log(`${this.name} → ${this.status} → ${this.priority}`);
    }
}

// Instantiating multiple test cases
let loginTest_ref = new TestCase("Login Test", "PASS", "P0");
let signupTest_ref = new TestCase("Signup Test", "FAIL", "P1");

loginTest_ref.display();  // Outputs: "Login Test → PASS → P0"
signupTest_ref.display(); // Outputs: "Signup Test → FAIL → P1"
```

### Key Points
- Instance methods defined in the class body are placed on the class's `.prototype` object, saving memory across hundreds of test objects.
- String concatenation or template literals (`${this.name}`) can be used to format test metadata cleanly for loggers and test reporters.
- Encapsulating test results in classes allows integrating auxiliary helper methods like `isPassed()`, `retry()`, or `toJSON()`.

---

## Common Mistakes
- **Losing `this` during method extraction:** Passing `loginTest_ref.display` as a standalone callback (e.g., `setTimeout(loginTest_ref.display, 100)`) detaches `this`, leading to `undefined` property outputs unless bound using `.bind(loginTest_ref)` or an arrow wrapper.
- **Overwriting shared prototype methods on instances:** Assigning `loginTest_ref.display = ...` overrides the prototype method only for that specific instance.

---

## Summary
**Key Takeaway:** Classes provide an ideal object-oriented model for test automation entities like `TestCase`, encapsulating state and sharing behavior methods efficiently via the prototype chain.
