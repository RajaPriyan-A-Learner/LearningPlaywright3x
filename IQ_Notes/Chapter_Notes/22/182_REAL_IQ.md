# 182_REAL — Constructor Chaining with `super()` and Super Method Calls

**File:** `22_chapter_Inheritance/Single Inheritance/182_REAL.js`

## Overview
This file demonstrates two crucial uses of the `super` keyword in JavaScript inheritance:
1. Invoking the parent constructor using `super(...)` to initialize inherited state (`this.name`).
2. Calling specific parent methods directly using `super.methodName()` from within child methods.

---

## Main Concept
When a derived class defines its own constructor:
1. **`super()` Constructor Call:** It must call `super()` before accessing `this`. Failure to call `super()` results in a `ReferenceError: Must call super constructor in derived class before accessing 'this'`.
2. **`super.foo()` Method Delegation:** Derived class methods can delegate to or reuse parent implementations using the `super` reference.

### Code Example

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(this.name + " is eating");
    }

    sleep() {
        console.log(this.name + " is sleeping");
    }

    foo() {
        console.log("Foo Called!");
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Invokes the parent constructor
        this.breed = breed;
    }

    bark() {
        super.foo(); // Calls parent foo() method
        console.log(this.name, " is barking!");
    }
}

let dog = new Dog("Rex", "Labrador");
dog.eat();              // "Rex is eating"
dog.sleep();            // "Rex is sleeping"
dog.bark();             // "Foo Called!" followed by "Rex  is barking!"
console.log(dog.breed); // "Labrador"
```

### Key Points
- `super(name)` passes constructor parameters up to `Animal` so that `this.name` is assigned properly.
- `this` in a derived constructor only becomes valid AFTER `super()` has executed.
- `super.foo()` explicitly resolves to `Animal.prototype.foo` while preserving `this` bound to the current `Dog` instance.

---

## Common Mistakes
- **Accessing `this` before `super()`:** Placing `this.breed = breed;` before `super(name);` causes a runtime `ReferenceError`.
- **Using `super` outside of classes or object literals:** `super` is a special keyword only valid inside class constructors, methods, and concise object method definitions.

---

## Summary
**Key Takeaway:** The `super` keyword serves dual purposes in JavaScript: `super()` executes the parent constructor to initialize instance state, while `super.methodName()` allows child methods to invoke parent functionality.
