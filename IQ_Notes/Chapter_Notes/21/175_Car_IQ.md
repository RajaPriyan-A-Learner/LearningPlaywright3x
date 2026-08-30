# 175_Car — Encapsulating Object State with Getter and Setter Methods

**File:** `21_chapter_Encapsulation/175_Car.js`

## Overview
This file demonstrates encapsulation applied to a real-world entity (`Car`). It shows how critical internal components (like `#engine`) can be isolated from unauthorized direct modification, ensuring state changes flow strictly through public interface methods (`getEngine` and `setEngine`).

---

## Main Concept
Encapsulating object state guarantees that data integrity is maintained throughout the lifecycle of an application.

### Why Encapsulate Engine in a Car Class?
- **Protection:** External consumers should not be able to bypass validation or directly reassign core components to invalid states.
- **Abstraction:** The consumer only interacts with high-level contracts (`getEngine`, `setEngine`) without worrying about internal representations or side effects.

### Code Example

```javascript
class Car {
    #engine; // #private field

    constructor(name, engineName) {
        this.name = name;
        this.#engine = engineName;
    }

    getEngine() {
        return this.#engine;
    }

    setEngine(nameEngine) {
        this.#engine = nameEngine;
    }
}

let tesla = new Car("Tesla", "V8");
console.log(tesla.getEngine()); // "V8"
tesla.setEngine("V9");
console.log(tesla.getEngine()); // "V9"
```

### Key Points
- `this.name` is a public property, directly accessible via `tesla.name`.
- `this.#engine` is a private field, strictly protected and accessible only inside class `Car`.
- Encapsulation allows you to inject logging, validation checks, or event emission inside setter methods in the future without changing the caller's interface.

---

## Common Mistakes
- **Assuming `Object.keys()` reveals private fields:** Calling `Object.keys(tesla)` or `JSON.stringify(tesla)` only returns `["name"]`. Private `#` fields are completely omitted.
- **Confusing closure-based privacy with `#` private fields:** `#` fields are true language-level class members stored privately in the internal slots of the instance.

---

## Summary
**Key Takeaway:** By hiding critical attributes such as `#engine` behind getter and setter methods, classes enforce clear API boundaries and maintain control over internal data mutations.
