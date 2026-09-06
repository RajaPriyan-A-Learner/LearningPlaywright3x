# EX3 — Instance Property Binding and User Class Modeling

**File:** `24_chapter_OOPS_Interview/EX3.js`

## Overview
This file demonstrates **Instance Property Binding** through a foundational `User` class in JavaScript. It shows how the constructor accepts an argument, binds it to `this.name`, and exposes an instance method `greet()` that accesses the instance state at runtime.

---

## Main Concept

In JavaScript class design, `this` represents the execution context of the specific object instance created by `new`. Each instance maintains its own distinct heap storage for properties while sharing the method implementation defined on `User.prototype`.

### Instance Isolation
Even though `u1` and `u2` invoke the exact same function reference `User.prototype.greet`, the value of `this.name` dynamically resolves to the corresponding instance:
- `u1.greet()` -> `this` is `u1` -> `"Hi, I am Alice"`
- `u2.greet()` -> `this` is `u2` -> `"Hi, I am Bob"`

### Code Example

```javascript
class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hi, I am " + this.name);
    }
}

let u1 = new User("Alice");
let u2 = new User("Bob");

u1.greet(); // "Hi, I am Alice"
u2.greet(); // "Hi, I am Bob"

// Verification: Methods are shared, properties are isolated
console.log(u1.greet === u2.greet); // true (same prototype function)
console.log(u1.name !== u2.name);   // true (isolated instance state)
```

### Key Points
- **Prototype Sharing:** `u1.greet === u2.greet` is `true`. Prototype delegation prevents recreating functions for every instantiated user.
- **Dynamic Context (`this`):** The value of `this` is determined at call time by the object preceding the dot operator (`u1.` vs `u2.`).
- **Test User Generation:** Ideal for test fixtures generating distinct personas (e.g., `AdminUser`, `StandardUser`, `GuestUser`).

---

## Common Mistakes
- **Losing `this` context when passing callbacks:** Passing `setTimeout(u1.greet, 1000)` detaches `greet` from `u1`, causing `this.name` to be `undefined`. Use `setTimeout(() => u1.greet(), 1000)` or `setTimeout(u1.greet.bind(u1), 1000)`.
- **Modifying the prototype directly:** Changing `User.prototype.name` provides a fallback, but per-instance properties set in the constructor take precedence.

---

## Summary
**Key Takeaway:** The `User` class illustrates how JavaScript cleanly separates isolated instance properties (`this.name`) from shared prototype methods (`greet()`).
