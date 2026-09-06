# 188 — Multiple Inheritance Limitation in JavaScript

**File:** `22_chapter_Inheritance/Multiple Inheritance/188.js`

## Overview
This file demonstrates a core architectural constraint of JavaScript: ECMAScript classes support only **Single Inheritance**. Attempting to extend multiple classes directly using comma-separated parent classes syntax (`class Son extends F1, F2`) results in an immediate syntax error. To combine behaviors from multiple classes, JavaScript developers must use alternatives like the **Mixin Pattern** or object composition.

---

## Main Concept

JavaScript uses prototype-based delegation where every object has at most one prototype object (`[[Prototype]]` link). Because an object or class constructor cannot have two prototype links simultaneously, multiple class inheritance cannot be natively represented in the prototype chain.

### The Syntax Restriction
In languages like C++ or Python, multiple inheritance is permitted. However, in JavaScript:
```javascript
class F1 {}
class F2 {}

// ❌ SyntaxError: Unexpected token ','
// class Son extends F1, F2 {}
```

### The Solution: Mixins
A mixin is a function that takes a superclass as an argument and returns a subclass extending that superclass. By nesting mixin invocations, multiple classes of capabilities can be stacked onto a single target class.

### Code Example

```javascript
class F1 {
    drive() {
        console.log("Driving car...");
    }
}

class F2 {
    fly() {
        console.log("Flying plane...");
    }
}

// ❌ SyntaxError in JavaScript:
// class Son extends F1, F2 {}

// ✅ Solution via Composition / Mixin Pattern:
const FlyableMixin = (Base) => class extends Base {
    fly() {
        console.log("Flying plane...");
    }
};

class Son extends FlyableMixin(F1) {
    work() {
        console.log("Son working");
    }
}

const s = new Son();
s.drive(); // From F1
s.fly();   // From FlyableMixin
s.work();  // From Son
```

### Key Points
- In JavaScript, `class Child extends Parent` permits exactly ONE parent expression.
- The prototype chain is strictly linear: `Son.prototype -> F1.prototype -> Object.prototype -> null`.
- To share multiple independent behavior sets (such as logging, screenshot capture, API utilities), use subclass factory mixins or composition (`has-a` instead of `is-a`).

---

## Common Mistakes
- **Assuming multiple inheritance works like Java or Python:** Writing `extends A, B` or `extends A implements B, C` (in pure JS) causes runtime/syntax parsing errors.
- **Diamond Problem confusion:** Multiple inheritance causes ambiguity when two parents have a method with the same name. By enforcing single inheritance and linear mixin chaining, JavaScript avoids the classical diamond problem.

---

## Summary
**Key Takeaway:** JavaScript strictly enforces Single Inheritance through its prototype chain; attempting `class Child extends A, B` throws a `SyntaxError`. Multi-class capability is instead achieved through functional Mixins or composition.
