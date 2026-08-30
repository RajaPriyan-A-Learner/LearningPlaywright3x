# 164_REAL — Class Constructors, Parameterized Initialization, and Multiple Instances

**File:** `20_chapter_Class_objects/20_01_Classes_Objects/164_REAL.js`

## Overview
This file demonstrates parameterized constructors in JavaScript ES6 Classes. It shows how arguments passed during object instantiation via `new` initialize instance-specific properties, how multiple distinct instances maintain separate states, and how classes behave without explicit constructors or when syntax rules are violated.

---

## Main Concept

The `constructor` method is a special method for creating and initializing an object created with a class.

### Key Concepts:
1. **Parameterized Constructors:** Allow passing initial values (e.g., `assigned_name`) during instantiation with `new Car("i10")`.
2. **Instance Property Assignment:** Assigning `this.name = assigned_name` creates an own-property on the newly created object in memory.
3. **Multiple Object Instances:** Each instance (`hyndai_i10`, `hyndai_create`, `a`, `b`) is an independent entity with its own property values.
4. **Default Constructor:** If no constructor is specified (e.g., `class Bike {}`), JavaScript provides an implicit empty default constructor `constructor() {}`.
5. **Single Constructor Rule:** A class can have only one constructor. Defining multiple constructors throws a `SyntaxError: A class may only have one constructor`.

### Code Example

```javascript
class Car {
    // Parameterized constructor
    constructor(assigned_name) {
        this.name = assigned_name;
    }
}

// Creating distinct instances with custom initial state
let hyndai_i10 = new Car("i10");
console.log(hyndai_i10.name); // "i10"

let hyndai_create = new Car("creta");
console.log(hyndai_create.name); // "creta"

const a = new Car("i11");
const b = new Car("Nexon");

// Default constructor behavior
class Bike {}
const myBike = new Bike(); // Bike {} — instantiates with default empty constructor
```

### Key Points
- In JavaScript, constructor overloading (defining multiple constructors with different signatures) is not supported; attempting it causes a `SyntaxError`.
- If parameter defaults or optional configurations are required, use default function parameters or options objects (e.g., `constructor(name = "Default")`).
- Instantiating empty classes like `new Bike()` is completely valid and returns an empty object inheriting from `Bike.prototype`.

---

## Common Mistakes
- **Defining multiple constructors:** Writing `class Bad { constructor(a) {} constructor(b) {} }` results in an immediate syntax error.
- **Forgetting `this` keyword:** Writing `name = assigned_name` inside constructor sets a global/scoped variable instead of the instance property `this.name`.

---

## Summary
**Key Takeaway:** The `constructor` method initializes instance properties upon instantiation with `new`. JavaScript permits exactly one constructor per class and provides an implicit default constructor when none is defined.
