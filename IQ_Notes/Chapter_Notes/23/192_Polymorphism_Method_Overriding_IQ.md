# 192 — Polymorphism and Method Overriding in Test Automation

**File:** `23_chapter_Polymorphism/192.js`

## Overview
This file demonstrates **Polymorphism** via **Method Overriding** in JavaScript. Polymorphism ("many forms") enables child classes to provide specialized implementations of methods defined in their parent classes. In this example, `APIPage` overrides the `setup()` method inherited from `BaseTest`, enabling the execution of context-specific initialization logic through a uniform method name.

---

## Main Concept

Polymorphism allows objects of different types to respond to the identical method invocation in their own unique way. In JavaScript, this is achieved through the prototype chain: when `test.setup()` is called on an `APIPage` instance, the JavaScript runtime searches the instance and `APIPage.prototype` first; finding `setup()` there, it invokes it immediately without climbing higher to `BaseTest.prototype`.

### Dynamic Method Dispatch
- When `btest.setup()` is called on a `BaseTest` instance, it prints `"Base: open browser"`.
- When `test.setup()` is called on an `APIPage` instance, it prints `"APITest: open browser"`.
- Both instances expose the same method signature `setup()`, but their runtime behavior adapts dynamically to the object's class.

### Code Example

```javascript
class BaseTest {
    setup() {
        console.log("Base: open browser");
    }
}

class APIPage extends BaseTest {
    setup() {
        console.log("APITest: open browser");
    }
}

let btest = new BaseTest();
let test = new APIPage();

test.setup();  // "APITest: open browser" (Overridden behavior)
btest.setup(); // "Base: open browser"    (Base behavior)

// TS = JS + Rules
```

### Key Points
- **Subtype Polymorphism:** Calling `setup()` across an array of varied test runners (`[new BaseTest(), new APIPage()]`) allows each test to configure its unique environment without requiring `if/else` checks.
- **Shadowing:** The child method shadows the parent method with the same name on the prototype chain.
- **Accessing Parent Logic:** If a child needs to augment rather than completely replace parent behavior, it can invoke `super.setup()`.

---

## Common Mistakes
- **Expecting Method Overloading:** Unlike Java or C#, JavaScript does NOT support method overloading (multiple methods with the same name but different parameter types). In JavaScript, declaring a second method with the same name simply overwrites the first.
- **Breaking the Liskov Substitution Principle (LSP):** Overriding a method to return an incompatible data type or accept drastically incompatible arguments breaks downstream callers expecting standard `BaseTest` behavior.

---

## Summary
**Key Takeaway:** Polymorphism through method overriding allows derived classes like `APIPage` to supply specialized behavior for a common interface defined in `BaseTest`, enabling clean, decoupled test architectures.
