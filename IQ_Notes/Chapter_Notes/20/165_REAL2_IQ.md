# 165_REAL2 — Object Lifecycle and Constructor Execution Trigger

**File:** `20_chapter_Class_objects/20_01_Classes_Objects/165_REAL2.js`

## Overview
This file illustrates the fundamental lifecycle of an ES6 class instance, specifically focusing on how and when the `constructor` function executes. It highlights that the constructor is an initialization hook that runs automatically at the exact moment an object is instantiated with the `new` operator.

---

## Main Concept

When a class is instantiated using the `new` keyword, the JavaScript engine performs a structured 4-step sequence:
1. **Allocates Memory:** A new empty object is created in heap memory.
2. **Sets Prototype Link:** The new object's internal `[[Prototype]]` is linked to `ClassName.prototype`.
3. **Binds `this`:** The `this` context inside the class constructor is bound to the freshly created object.
4. **Executes Constructor:** Code inside `constructor()` runs (e.g., logging messages, assigning attributes, establishing connections).

### Code Example

```javascript
class Car {
    // Constructor handles initial setup & side-effects
    constructor() {
        console.log("Hi,Object is created");
    }
}

// Instantiation triggers immediate constructor execution
const obj_Ref = new Car(); 
// Output in console: "Hi,Object is created"
```

### Key Points
- Constructors are ideal for initial setup, setting initial timestamps, acquiring resources, or configuring default test states.
- If no return value is explicitly returned from the constructor, `this` (the newly created instance) is automatically returned.
- A constructor should avoid returning primitive values because returning a primitive from a constructor is ignored by the engine (it still returns `this`).

---

## Common Mistakes
- **Expecting constructor to run on class declaration:** A class declaration itself does not execute the constructor; execution occurs solely upon calling `new Car()`.
- **Accidentally omitting `const` or `let`:** Assigning `obj_Ref = new Car()` without `let`/`const`/`var` creates an accidental global variable in non-strict mode.

---

## Summary
**Key Takeaway:** The constructor function acts as the automatic initialization lifecycle hook of a class, executing immediately upon object creation via `new` to configure instance state and perform setup logic.
