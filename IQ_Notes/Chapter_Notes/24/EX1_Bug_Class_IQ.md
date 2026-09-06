# EX1 — Modeling Defects with the Bug Class

**File:** `24_chapter_OOPS_Interview/EX1.JS`

## Overview
This file demonstrates core **Object-Oriented Programming (OOP)** modeling in JavaScript by creating a `Bug` class to represent defect reports in a QA automation framework. It illustrates constructor initialization for instance fields (`title`, `severity`) and instance method definition for formatted display output.

---

## Main Concept

A class serves as a blueprint for creating objects with shared structure and behavior. When instantiated with `new`, JavaScript allocates a new object, binds `this` to that instance, runs the `constructor`, and links the instance's prototype to `Bug.prototype`.

### Instance State vs Prototype Methods
- `this.title` and `this.severity` are unique instance properties assigned per object.
- `display()` is defined on `Bug.prototype`, allowing all `Bug` instances to share a single method in memory.

### Code Example

```javascript
class Bug {
    constructor(title, severity) {
        this.title = title;
        this.severity = severity;
    }

    display() {
        console.log("[" + this.severity + "] " + this.title);
    }
}

let b1 = new Bug("Login crash", "Critical");
let b2 = new Bug("Typo in footer", "Low");

b1.display(); // "[Critical] Login crash"
b2.display(); // "[Low] Typo in footer"
```

### Key Points
- **Multiple Instances:** `b1` and `b2` maintain independent state while executing the shared `display()` method.
- **Memory Efficiency:** Methods defined inside the `class` body reside on `Bug.prototype`, avoiding duplicate function creation across thousands of bug instances.
- **`new` Keyword:** Invoking `Bug` without `new` throws `TypeError: Class constructor Bug cannot be invoked without 'new'`.

---

## Common Mistakes
- **Forgetting `this.` inside the constructor:** Writing `title = title;` creates a global or local variable rather than assigning an instance field.
- **Calling the class without `new`:** In ES6 classes, constructor execution requires the `new` operator.

---

## Summary
**Key Takeaway:** The `Bug` class demonstrates foundational OOP encapsulation, binding distinct instance state (`title`, `severity`) while sharing behavior (`display()`) via the prototype.
