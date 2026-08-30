# 170_Static_Real — Static Properties for Global Class State Tracking

**File:** `20_chapter_Class_objects/20_03_Static/170_Static_Real.js`

## Overview
This file demonstrates how `static` properties function in JavaScript classes to manage shared, class-level state. Using a `TestRunner` class example, it showcases how static variables (`totalTests`, `passCount`) accumulate aggregate metrics across multiple object instantiations, contrasting class-level state against instance-level properties (`name`).

---

## Main Concept

In JavaScript classes, the `static` keyword defines properties and methods that belong to the class constructor function itself, rather than to any specific instance.

### Static vs. Instance Variables:
1. **Static Properties (`TestRunner.totalTests`):** Allocated once on the constructor object. Shared by all instances and accessible directly via `ClassName.property`.
2. **Instance Properties (`this.name`):** Allocated per object instance on the heap. Each instance maintains its own distinct copy.
3. **Tracking Aggregates:** Incrementing static variables inside the constructor provides an automatic counter of total created objects and cumulative results.

### Code Example

```javascript
class TestRunner {
    // Static properties belong to the class itself
    static totalTests = 0;
    static passCount = 0;

    constructor(name, passed) {
        this.name = name; // Instance property
        TestRunner.totalTests++; // Increments shared static counter
        if (passed) {
            TestRunner.passCount++;
        }
    }
}

// Creating 4 distinct test instances
let t1 = new TestRunner("loginTest", true);
let t2 = new TestRunner("signTest", false);
let t3 = new TestRunner("dashboardTest", true);
let t4 = new TestRunner("supportTest", true);

// Accessing static properties via ClassName
console.log(TestRunner.totalTests); // 4
console.log(TestRunner.passCount);  // 3

// Accessing instance properties via instance reference
console.log(t1.name); // "loginTest"
console.log(t2.name); // "signTest"
```

### Key Points
- Static properties are accessed directly on the class identifier (`TestRunner.totalTests`), NOT on instances (`t1.totalTests` is `undefined`).
- Ideal for global counters, shared configuration constants, database connection pools, or cache maps.
- When an instance modifies a static property (via `TestRunner.totalTests++`), the change is immediately visible to all consumers of the class.

---

## Common Mistakes
- **Accessing static properties from instances:** Attempting `t1.totalTests` returns `undefined` because static properties are not attached to `TestRunner.prototype` or instance objects.
- **Using `this.totalTests++` inside constructor without caution:** If `this.totalTests` is used, it sets an instance-level property instead of modifying `TestRunner.totalTests`.

---

## Summary
**Key Takeaway:** Static properties belong to the class constructor rather than individual instances, providing a centralized mechanism to track shared state, metrics, and configurations across an entire application.
