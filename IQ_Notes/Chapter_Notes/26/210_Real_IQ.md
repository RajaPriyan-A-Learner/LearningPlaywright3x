# 210 — Parameterized Constructors and Method Stubs in Vanilla JavaScript

**File:** `26_chapter_Abstractions/01_chapter_Interfaces/210_Real.js`

## Overview
This file demonstrates a **Parameterized Constructor** and empty method stubs in vanilla JavaScript through a `Car` class (`hyundai_i10`, `hyundai_creta`). It illustrates how JavaScript objects manage instance properties without interfaces, providing a practical contrast that highlights why TypeScript's interfaces are essential for enforcing behavioral contracts.

---

## Main Concept

In ECMAScript, classes accept arguments via a constructor function to initialize distinct instance properties. However, unlike TypeScript, JavaScript provides no native mechanism to guarantee that a class implements a specific set of methods.

### Parameterized Constructors in JavaScript
```javascript
class Car {
    constructor(assigned_name) {
        this.name = assigned_name;
    }

    eat() {} // Empty method stub
}

let hyundai_i10 = new Car("i10");
let hyundai_creta = new Car("creta");
```
- Each instance (`hyundai_i10`, `hyundai_creta`) receives its own `name` value.
- `eat()` is defined on `Car.prototype`, but its behavior is empty because JavaScript lacks compile-time interface enforcement.

### Code Example

```javascript
class Car {
    // Parameterized Constructor
    constructor(assigned_name) {
        this.name = assigned_name;
    }

    eat() {}
}

let hyundai_i10 = new Car("i10");
console.log(hyundai_i10.name); // "i10"
hyundai_i10.eat();             // Executes empty stub (undefined)

let hyundai_creta = new Car("creta");
console.log(hyundai_creta.name); // "creta"
```

### Key Points
- **Independent State:** The constructor assigns `assigned_name` to `this.name`, ensuring each `Car` object maintains isolated state.
- **Lack of Interface Guarantees:** In vanilla JS, if a subclass or sibling class forgets to implement `eat()` or implements it with unexpected parameters, no error is raised until runtime.
- **Transition to TypeScript:** In TypeScript, an `interface Vehicle { name: string; drive(): void; }` guarantees that classes like `Car` implement required methods with correct signatures before compilation.

---

## Common Mistakes
- **Assuming empty methods enforce child implementation:** Unlike abstract methods in Java or TypeScript, empty methods in JavaScript do not force subclasses to override them.
- **Forgetting constructor parameter assignment:** Omitting `this.name = assigned_name` leaves the property unassigned on the instance.

---

## Summary
**Key Takeaway:** Parameterized constructors in JavaScript initialize instance state, but without TypeScript interfaces, classes cannot enforce compile-time method contracts or architectural guarantees.
