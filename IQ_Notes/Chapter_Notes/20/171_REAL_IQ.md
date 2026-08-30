# 171_REAL — Static Methods vs Instance Methods and Scope Interaction

**File:** `20_chapter_Class_objects/20_03_Static/171_REAL.js`

## Overview
This file explores the core differences between static methods and instance methods within JavaScript classes. It demonstrates how static methods (`summary()`) operate on class-level static properties to compute aggregate results without needing an instance reference, while instance methods (`pramod_fn()`) operate on individual instance properties.

---

## Main Concept

JavaScript class definitions can contain both **Static Methods** and **Instance Methods**:
1. **Static Methods (`static summary()`):** Defined with the `static` keyword. Called directly on the class (`TestRunner.summary()`). Inside a static method, `this` refers to the class constructor itself (`TestRunner`), not an instance.
2. **Instance Methods (`pramod_fn()`):** Defined without `static`. Called on an instance (`instance.pramod_fn()`). Inside an instance method, `this` refers to the specific instance object.
3. **Lexical Scope Access:** Class constructors and methods can access variables from outer lexical scopes (like `let a = 10`).

### Code Example

```javascript
let a = 10;

class TestRunner {
    static totalTests = 0;
    static passCount = 0;

    constructor(name, passed) {
        this.name = name;
        TestRunner.totalTests++;
        if (passed) {
            TestRunner.passCount++;
        }
        console.log(a); // Accesses outer scope variable
    }

    // Instance method (operates on instance state)
    pramod_fn() {
        return this.name;
    }

    // Static method (operates on class-level metrics)
    static summary() {
        return `${TestRunner.passCount}/${TestRunner.totalTests} passed`;
    }
}

// Running multiple tests
new TestRunner("Login", true);
new TestRunner("Signup", false);
new TestRunner("Cart", true);
new TestRunner("Checkout", true);

// Calling static method on class
console.log(TestRunner.summary()); // "3/4 passed"

// Note: TestRunner.pramod_fn() would throw TypeError (not a static method)
```

### Key Points
- Static methods are frequently used for factory methods (e.g., `User.fromJSON(data)`), mathematical utilities (`Math.max()`), or framework summary reports.
- Attempting to invoke an instance method on a class (e.g., `TestRunner.pramod_fn()`) throws `TypeError: TestRunner.pramod_fn is not a function`.
- Attempting to invoke a static method from an instance (e.g., `t1.summary()`) also throws a `TypeError`.

---

## Common Mistakes
- **Invoking static methods on instances:** Calling `instance.summary()` instead of `TestRunner.summary()`.
- **Using `this` inside static methods expecting instance state:** Inside `static summary()`, `this.name` is the class name (`"TestRunner"`), not an instance property.

---

## Summary
**Key Takeaway:** Static methods execute at the class level and have access to static properties and the class constructor, whereas instance methods execute in the context of individual instance objects.
