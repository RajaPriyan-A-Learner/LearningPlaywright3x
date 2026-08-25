# 163_class — JavaScript Classes, Private Fields, and Object Instantiation

**File:** `20_chapter_Class_objects/163_class.js`

## Overview
This file introduces ES6 Classes in JavaScript, demonstrating the core Object-Oriented Programming (OOP) paradigm of encapsulating attributes (state) and behaviors (methods) within a class blueprint, utilizing modern private field syntax (`#`), and instantiating unique objects with the `new` operator.

---

## Main Concept
A **Class** acts as a blueprint or template for creating objects. 
A class typically encapsulates:
1. **Attributes / Properties / State:** The data associated with an object (e.g., `#name`, `#age`).
2. **Behaviors / Methods:** The functions defining what the object can perform (e.g., `eat()`, `sleep()`).

### The CAB Principle (Class -> Attributes + Behaviors)
Classes organize code around the **CAB** model:
- **C**lass defines the blueprint.
- **A**ttributes store object state (using `#` prefix for hard private encapsulation).
- **B**ehaviors define actions and business logic.

### Object Instantiation and References
Using the `new` operator creates a new object instance in heap memory and invokes the constructor. The variable (e.g., `pramod`) holds a **reference** to that memory location.

### Code Example

```javascript
class Person {
    // Attributes (Private Class Fields)
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    // Behaviors (Methods)
    eat() {
        console.log(`${this.#name} is eating.`);
    }

    sleep() {
        console.log(`${this.#name} is sleeping.`);
    }
}

// Instantiation: creating distinct object instances via 'new'
const pramod = new Person("Pramod", 30);
const amit = new Person("Amit", 25);

pramod.eat(); // Outputs: "Pramod is eating."
amit.sleep(); // Outputs: "Amit is sleeping."
```

### Key Points
- Private fields with `#` cannot be accessed or modified from outside the class body, enforcing true OOP encapsulation.
- Each `new ClassName()` call creates an independent instance with its own state.
- Classes are syntactically cleaner abstractions over JavaScript's underlying prototype-based inheritance model.
- In Playwright test automation, classes form the backbone of Page Object Models (e.g., `LoginPage`, `DashboardPage`).

---

## Common Mistakes
- **Accessing private fields directly:** Trying to read `pramod.#name` outside the class throws a `SyntaxError: Private field '#name' must be declared in an enclosing class`.
- **Calling classes without `new`:** In JavaScript, calling a class like a standard function (e.g., `Person()`) throws a `TypeError: Class constructor Person cannot be invoked without 'new'`.

---

## Summary
**Key Takeaway:** JavaScript Classes provide a clean blueprint structure organizing Attributes and Behaviors (CAB), utilizing `#` private fields for robust data encapsulation and `new` for creating independent object instances.
