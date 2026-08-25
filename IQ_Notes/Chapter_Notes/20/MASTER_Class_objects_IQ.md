# 20 — Classes & Objects : Complete Interview & Reference Guide

> One-paragraph elevator pitch: ES6 Classes provide modern syntactic sugar over JavaScript's prototypal inheritance, introducing structured object-oriented programming (OOP) principles — encapsulation, inheritance, private fields, and polymorphism — crucial for scalable web applications and Page Object Model (POM) test automation architectures.

---

## Table of Contents
1. [Syntax Reference — End to End](#1-syntax-reference--end-to-end)
2. [Built-in Functions & Methods](#2-built-in-functions--methods)
3. [Deep Insights & Gotchas](#3-deep-insights--gotchas)
4. [Interview-Ready Definitions](#4-interview-ready-definitions)
5. [Tricky Interview Questions](#5-tricky-interview-questions)
6. [Controversial Topics & Ongoing Debates](#6-controversial-topics--ongoing-debates)
7. [Quick Reference Cheat Sheet](#7-quick-reference-cheat-sheet)
8. [Memory Map & Visual Flowchart](#8-memory-map--visual-flowchart)
9. [LinkedIn-Style Post](#9-linkedin-style-post)

---

## Overview
JavaScript classes, introduced in ECMAScript 2015 (ES6), provide a formal syntax for defining object blueprints with constructors, instance methods, static properties, getters, setters, and hard private fields (`#`). While JavaScript remains prototype-based under the hood, classes streamline Object-Oriented Programming (OOP) patterns, making code more readable, maintainable, and aligned with standard software engineering practices.

---

## 1. Syntax Reference — End to End

### 1.1 Basic Class Declaration & Constructor
```javascript
class Person {
    // Constructor initializes instance state
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Instance Method (attached to Person.prototype)
    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

const user = new Person("Pramod", 30);
console.log(user.greet());
```

### 1.2 Private Fields and Methods (`#` Syntax)
```javascript
class BankAccount {
    #balance = 0; // Private field

    constructor(initialDeposit) {
        this.#balance = initialDeposit;
    }

    deposit(amount) {
        if (amount > 0) this.#balance += amount;
    }

    #calculateInterest() { // Private method
        return this.#balance * 0.05;
    }

    getBalance() {
        return this.#balance;
    }
}
```

### 1.3 Inheritance (`extends` and `super`)
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a noise.`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Invokes parent constructor (MANDATORY before using 'this')
        this.breed = breed;
    }

    speak() { // Method overriding (Polymorphism)
        return `${this.name} barks loudly!`;
    }
}
```

### 1.4 Getters and Setters (`get` / `set`)
```javascript
class Temperature {
    #celsius = 0;

    constructor(celsius) {
        this.#celsius = celsius;
    }

    get fahrenheit() {
        return (this.#celsius * 9/5) + 32;
    }

    set fahrenheit(value) {
        this.#celsius = (value - 32) * 5/9;
    }
}
```

### 1.5 Static Methods and Properties
```javascript
class MathUtils {
    static PI = 3.14159;

    static add(a, b) {
        return a + b;
    }
}

console.log(MathUtils.PI);        // 3.14159 (Called on class directly, not instance)
console.log(MathUtils.add(10, 5)); // 15
```

### 1.6 Page Object Model (Playwright Pattern)
```javascript
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async navigate(url) {
        await this.page.goto(url);
    }
}

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.submitButton = '#login-btn';
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
    }
}
```

---

## 2. Built-in Functions & Methods

Classes interact with core object reflection utilities and operators:

### 1. `instanceof` Operator
- **Signature:** `object instanceof Constructor`
- **Return Value:** `boolean`
- **Example:**
```javascript
const dog = new Dog("Rex", "German Shepherd");
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```

### 2. `Object.getPrototypeOf(obj)`
- **Signature:** `Object.getPrototypeOf(object: Object) -> Object | null`
- **Example:**
```javascript
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true
```

### 3. `Object.create(proto, [propertiesObject])`
- **Signature:** `Object.create(proto: Object) -> Object`
- **Example:** Used under the hood by class inheritance to wire prototype chains.

---

## 3. Deep Insights & Gotchas

### Insight 1: Classes Are Functions Under the Hood
In JavaScript, `typeof class Person {}` returns `"function"`. Classes are special constructor functions with enhanced prototype bindings and strict execution rules.

### Insight 2: Classes are NOT Hoisted Like Functions
Unlike regular function declarations, class declarations are subject to the **Temporal Dead Zone (TDZ)**. Calling `new Person()` before the `class Person` declaration throws `ReferenceError: Cannot access 'Person' before initialization`.

### Insight 3: Mandatory `new` Keyword
Constructor functions from ES5 could accidentally be invoked without `new` (polluting `window` or `global`). ES6 Classes strictly prohibit this:
```javascript
class Car {}
Car(); // TypeError: Class constructor Car cannot be invoked without 'new'
```

### Insight 4: `super()` Must Precede `this`
In derived subclasses, you MUST invoke `super()` before accessing `this`. Attempting to access `this` beforehand throws a `ReferenceError: Must call super constructor in derived class before accessing 'this'`.

---

## 4. Interview-Ready Definitions

### Class
> **Definition (say this):** "A Class in JavaScript is a syntactical blueprint for creating objects, bundling data attributes and behavior methods with support for encapsulation, inheritance, and polymorphism."
> **Follow-up the interviewer will ask:** "Is JavaScript class-based or prototype-based?"
> **Answer:** "JavaScript remains fundamentally prototype-based; the `class` syntax is sugar over prototype chains and constructor functions."

### Encapsulation and Private Fields (`#`)
> **Definition (say this):** "Encapsulation is the OOP principle of restricting direct external access to an object's internal state. In modern JavaScript, private fields prefixed with `#` enforce hard privacy that cannot be accessed or modified from outside the class scope."
> **Follow-up the interviewer will ask:** "How do `#` private fields differ from the conventional `_` underscore prefix?"
> **Answer:** "`_` is merely a naming convention and remains completely public at runtime, whereas `#` is enforced at the language level and cannot be accessed via reflection like `Object.keys()` or bracket notation."

### Prototypal Inheritance
> **Definition (say this):** "Prototypal inheritance is JavaScript's mechanism where objects inherit properties and methods directly from another object via their internal `[[Prototype]]` link."
> **Follow-up the interviewer will ask:** "How does `super` work in the prototype chain?"
> **Answer:** "`super` refers to the prototype of the parent class, invoking the parent constructor or accessing overridden parent methods."

---

## 5. Tricky Interview Questions

### Q1: Output Prediction — Method vs Arrow Function in Class
**Q:** What is the difference in output and memory between:
```javascript
class Example {
    methodA() { console.log(this); }
    methodB = () => { console.log(this); };
}
```
**A:** `methodA` lives on `Example.prototype` and is shared across all instances (memory-efficient). `methodB` is recreated on every instance as an own-property, binding `this` lexically to that specific instance.

### Q2: Spot the Bug — Subclass Constructor
**Q:** Spot the bug in this code:
```javascript
class Vehicle {
    constructor(wheels) { this.wheels = wheels; }
}
class Car extends Vehicle {
    constructor(wheels, brand) {
        this.brand = brand;
        super(wheels);
    }
}
```
**A:** `ReferenceError: Must call super constructor in derived class before accessing 'this'`. `super(wheels)` must be called before `this.brand = brand`.

### Q3: Output Prediction — Static Inheritance
**Q:** Are static methods inherited by subclasses?
```javascript
class Parent { static greet() { return "Hi"; } }
class Child extends Parent {}
console.log(Child.greet());
```
**A:** `"Hi"`. Yes, in JavaScript, static methods and properties are inherited across class hierarchies via `Child.__proto__ === Parent`.

### Q4: Spot the Bug — Invoking Class Without `new`
**Q:** What happens when running:
```javascript
class User {}
const u = User();
```
**A:** `TypeError: Class constructor User cannot be invoked without 'new'`.

### Q5: Design Question — Why Use Page Object Models (POM)?
**Q:** Why use classes for Page Objects in Playwright automation?
**A:** Classes encapsulate web element locators and page-specific interactions into reusable methods. If UI locators change, updates are made in a single class file rather than across hundreds of individual test cases.

### Q6: Edge Case — Can a class extend a regular constructor function?
**A:** Yes. An ES6 class can extend any constructible function that has a valid `.prototype`.

### Q7: Output Prediction — Private Field Dynamic Access
**Q:** What does this output?
```javascript
class User {
    #id = 42;
    getId(key) { return this[key]; }
}
const u = new User();
console.log(u.getId('#id'));
```
**A:** `undefined`. Private `#` fields cannot be accessed using dynamic bracket notation (`this['#id']`).

### Q8: What happens if a class does not define a constructor?
**A:** A default constructor is automatically generated: `constructor() {}` for base classes, and `constructor(...args) { super(...args); }` for subclasses.

### Q9: Can getters and setters have the same name?
**A:** Yes, a getter and a setter can share the same identifier to define a readable/writable computed property.

### Q10: How do you create an abstract class pattern in JS?
**A:** Check `if (new.target === AbstractClassName) throw new Error("Cannot instantiate abstract class directly")` inside the constructor.

### Q11: What is `new.target`?
**A:** `new.target` is a meta-property available in constructors that refers to the constructor function invoked with `new`. In inheritance hierarchies, it points to the derived class being instantiated.

### Q12: Are classes executed in strict mode?
**A:** Yes. The entire body of a class declaration or class expression is always executed in strict mode (`'use strict'`), regardless of whether the flag is explicitly declared.

---

## 6. Controversial Topics & Ongoing Debates

### Classes vs Functional Programming (Closures and Factory Functions)
- **The Debate:** Many JavaScript advocates prefer functional programming with closures, composition, and factory functions over OOP classes.
- **The OOP / Class Perspective:** Classes provide clear structure, excellent performance (shared prototype methods), type system integration (TypeScript), and industry-standard Page Object patterns.
- **The Functional Perspective:** Classes introduce complex `this` binding quirks, fragile base class inheritance problems, and mutable state.
- **Current Consensus:** Use Classes where structural inheritance and lifecycle boundaries shine (such as Playwright Page Objects, custom UI components, and stateful services), and use Pure Functions/Closures for data processing, utility pipelines, and business logic transforms.

---

## 7. Quick Reference Cheat Sheet

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Declaration** | `class Foo {}` | Blueprint definition (TDZ enforced) |
| **Constructor** | `constructor(args) {}` | Initializes instance attributes |
| **Instance Method** | `bar() {}` | Stored on `Foo.prototype` |
| **Private Field** | `#secret = 123;` | Hard encapsulated, inaccessible externally |
| **Static Method** | `static help() {}` | Invoked on `Foo.help()`, not instance |
| **Subclass** | `class Bar extends Foo {}` | Inherits methods & static members |
| **Super Call** | `super(...args);` | Invokes parent constructor |
| **Getter/Setter** | `get val() {}` / `set val(v) {}` | Computed property accessors |

---

## 8. Memory Map & Visual Flowchart

### A) ASCII Mind Map
```
[Class & Object Model (CAB)]
  ├── Class Blueprint
  │     ├── Attributes (State)
  │     │     ├── Public Fields (this.x)
  │     │     └── Private Fields (#secret ⚠️ Hard privacy)
  │     ├── Behaviors (Methods)
  │     │     ├── Prototype Methods (Shared in memory ✅)
  │     │     └── Static Methods (Class-level utilities)
  │     └── Accessors (get / set)
  ├── Instantiation
  │     ├── 'new' Operator (Allocates heap memory, sets prototype)
  │     └── Object Reference (Pointer in Stack -> Object in Heap)
  └── Inheritance Hierarchy
        ├── extends (Wires [[Prototype]] chain)
        ├── super() (Must be called before 'this' in subclasses ⚠️)
        └── Polymorphism (Overriding parent behaviors)
```

### B) Decision Flowchart (Creating OOP Classes)
```mermaid
flowchart TD
    A[Define Class Structure] --> B{Does it represent child subtype?}
    B -->|Yes| C[Use 'extends Parent' + call 'super()']
    B -->|No| D[Declare Base Class]
    
    C --> E{Needs Private State?}
    D --> E
    
    E -->|Yes| F[Declare '#field' for strict encapsulation]
    E -->|No| G[Initialize properties in 'constructor()']
    
    F --> H{Method shared across instances?}
    G --> H
    
    H -->|Yes| I[Standard Prototype Method]
    H -->|No / Utility| J[Static Method 'static helper()']
```

### C) Execution Trace Box (Object Instantiation and State)

| Step | Statement | Heap Allocation | Reference Variable | `this.#name` Value |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `const pramod = new Person("Pramod", 30);` | Creates Object `@0x01` | `pramod -> @0x01` | `"Pramod"` |
| 2 | `const amit = new Person("Amit", 25);` | Creates Object `@0x02` | `amit -> @0x02` | `"Amit"` |
| 3 | `pramod.eat();` | Uses `@0x01` state | Unchanged | `"Pramod"` |
| 4 | `pramod.#name` | Direct external access | N/A | **Throws SyntaxError** |

---

## 9. LinkedIn-Style Post

### 📢 LinkedIn Post
> 💡 **The #1 JavaScript Class Mistake in Technical Interviews!** 💡
> 
> When creating subclasses in JavaScript, do you know why this code crashes instantly? 💥
> 
> ```javascript
> class BasePage {
>     constructor(page) { this.page = page; }
> }
> 
> class LoginPage extends BasePage {
>     constructor(page, timeout) {
>         this.timeout = timeout; // ❌ ReferenceError!
>         super(page);
>     }
> }
> ```
> 
> 🚨 **The Reason:** In JavaScript derived classes, the `this` binding does NOT exist until `super()` is called! Accessing `this` before `super()` throws a fatal runtime `ReferenceError`.
> 
> ✅ **The Fix:** Always call `super()` FIRST:
> ```javascript
> class LoginPage extends BasePage {
>     constructor(page, timeout) {
>         super(page); // ✅ Initializes parent first!
>         this.timeout = timeout;
>     }
> }
> ```
> 
> 💡 **Bonus Insight:** Modern `#` private fields give you real language-enforced privacy — no more fake `_` underscores!
> 
> Master OOP patterns to build world-class Playwright Page Object frameworks!
> 
> **Key Takeaway:** Always call `super()` before accessing `this` in derived classes, and leverage `#` private fields for true encapsulation.
> 
> #JavaScript #WebDevelopment #SoftwareEngineering #OOP #Playwright #CodingInterviews

---

## Summary
**Key Takeaway:** ES6 Classes provide clean Object-Oriented Programming abstractions over prototypal inheritance, organizing Attributes and Behaviors (CAB) with `#` private field encapsulation and robust inheritance hierarchies essential for enterprise automation architecture.
